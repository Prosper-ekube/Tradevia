import json
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from django.conf import settings

# Maps Tradevia display symbols → Twelve Data provider symbols.
# Anything not listed here is assumed to match on both sides.
#
# Verified against Twelve Data free tier:
#   US 30     -> DIA       (SPDR Dow Jones Industrial Average ETF)
#   Spot Gold -> XAU/USD   (Gold spot)
# UK 100 has no free-tier equivalent on Twelve Data; it is excluded from
# live fetching in views.py and falls back to the bundled price.
SYMBOL_MAP: dict[str, str] = {
    "US 30": "DIA",
    "Spot Gold": "XAU/USD",
}

REVERSE_MAP: dict[str, str] = {v: k for k, v in SYMBOL_MAP.items()}

REQUEST_TIMEOUT = 10  # seconds


class TwelveDataProvider:
    BASE_URL = "https://api.twelvedata.com/quote"

    def __init__(self):
        self.api_key = settings.MARKET_DATA_API_KEY
        if not self.api_key:
            raise ValueError("MARKET_DATA_API_KEY is not set")

    def fetch_quotes(self, symbols: list[str]) -> dict[str, Any]:
        """
        Fetch quotes for a list of Tradevia symbols.

        Strategy:
          1. Try a single batched request (1 API call, cheapest).
          2. If the batch fails at the API level (one bad symbol kills it),
             fall back to per-symbol requests and keep whatever succeeds.

        Returns a dict mapping *Tradevia* symbols to their raw Twelve Data
        payloads. Entries without a "close" field are dropped.
        """
        if not symbols:
            return {}

        provider_symbols = [SYMBOL_MAP.get(s, s) for s in symbols]

        batch = self._fetch_batch(provider_symbols)
        if batch:
            return self._rekey(batch)

        result: dict[str, Any] = {}
        for provider_symbol in provider_symbols:
            payload = self._fetch_one(provider_symbol)
            if payload is not None:
                result[provider_symbol] = payload
        return self._rekey(result)

    def _fetch_batch(self, provider_symbols: list[str]) -> dict[str, Any]:
        if not provider_symbols:
            return {}

        data = self._request({"symbol": ",".join(provider_symbols)})
        if data is None:
            return {}

        if len(provider_symbols) == 1 and "symbol" in data:
            return {provider_symbols[0]: data}

        if self._is_error(data):
            self._log_error("batch", data)
            return {}

        return {
            sym: payload
            for sym, payload in data.items()
            if isinstance(payload, dict) and "close" in payload
        }

    def _fetch_one(self, provider_symbol: str) -> dict[str, Any] | None:
        data = self._request({"symbol": provider_symbol})
        if data is None:
            return None

        if self._is_error(data):
            self._log_error(provider_symbol, data)
            return None

        if "close" not in data:
            return None

        return data

    def _request(self, params: dict[str, str]) -> dict[str, Any] | None:
        params = {**params, "apikey": self.api_key}
        url = f"{self.BASE_URL}?{urllib.parse.urlencode(params)}"

        try:
            with urllib.request.urlopen(url, timeout=REQUEST_TIMEOUT) as response:
                body = response.read().decode("utf-8")
        except urllib.error.HTTPError as exc:
            try:
                body = exc.read().decode("utf-8")
                data = json.loads(body)
                if self._is_error(data):
                    self._log_error("http", data)
                return None
            except (ValueError, json.JSONDecodeError):
                print(f"Market data HTTP error: {exc.code} {exc.reason}")
                return None
        except (urllib.error.URLError, TimeoutError) as exc:
            print(f"Market data network error: {exc}")
            return None

        try:
            data = json.loads(body)
        except json.JSONDecodeError as exc:
            print(f"Market data parse error: {exc}")
            return None

        if not isinstance(data, dict):
            return None

        return data

    def _rekey(self, raw: dict[str, Any]) -> dict[str, Any]:
        return {
            REVERSE_MAP.get(provider_sym, provider_sym): payload
            for provider_sym, payload in raw.items()
        }

    @staticmethod
    def _is_error(data: dict[str, Any]) -> bool:
        return data.get("status") == "error" or (
            "code" in data and data.get("code") not in (200, "200")
        )

    @staticmethod
    def _log_error(context: str, data: dict[str, Any]) -> None:
        code = data.get("code", "-")
        message = data.get("message", "unknown error")
        print(f"Twelve Data API error [{context}] {code}: {message}")