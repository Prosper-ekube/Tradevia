import traceback

from django.core.cache import cache
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Market, MarketCategory
from .serializers import (
    MarketCategorySerializer,
    MarketDetailSerializer,
    MarketListSerializer,
    LiveMarketSerializer,
)
from .services.provider import TwelveDataProvider

# Only markets whose symbols the provider actually recognises should be
# sent to Twelve Data. Markets not in this set are returned with their
# bundled fallback prices without any API call.
PROVIDER_SYMBOLS = {
    "EUR/USD",
    "GBP/USD",
    "AAPL",
    "BTC/USD",
    "Spot Gold",
    "US 30",
}


class MarketCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarketCategory.objects.all()
    serializer_class = MarketCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    pagination_class = None


class MarketViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Market.objects.select_related(
        "category").prefetch_related("key_facts", "related_markets")
    permission_classes = [AllowAny]
    lookup_field = "slug"
    pagination_class = None

    def get_serializer_class(self):
        if self.action == "retrieve":
            return MarketDetailSerializer
        return MarketListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset


class LiveMarketViewSet(viewsets.ViewSet):
    """
    Returns markets enriched with live pricing.
    Falls back to database values if the provider is unavailable.
    """
    permission_classes = [AllowAny]
    CACHE_KEY = "live_market_quotes"
    CACHE_TTL = 45  # seconds

    def list(self, request):
        markets = Market.objects.select_related("category").all()
        if not markets:
            return Response([])

        # Only fetch from the provider for symbols we've verified.
        symbols = [m.symbol for m in markets if m.symbol in PROVIDER_SYMBOLS]

        live_data = cache.get(self.CACHE_KEY)

        if live_data is None:
            live_data = {}
            if symbols:
                try:
                    provider = TwelveDataProvider()
                    live_data = provider.fetch_quotes(symbols)
                    # Only cache successful fetches so a failure doesn't
                    # mask a subsequent success.
                    cache.set(self.CACHE_KEY, live_data, self.CACHE_TTL)
                except Exception:
                    traceback.print_exc()
                    live_data = {}

        serializer = LiveMarketSerializer(
            markets, many=True, context={"live_data": live_data}
        )
        return Response(serializer.data)
