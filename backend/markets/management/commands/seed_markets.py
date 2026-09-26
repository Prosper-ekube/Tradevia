from django.core.management.base import BaseCommand

from markets.models import Market, MarketCategory, MarketKeyFact

CATEGORIES = [
    {
        "name": "Forex",
        "slug": "forex",
        "description": "Trade over 80 currency pairs around the clock, from majors like EUR/USD to emerging-market crosses.",
        "icon": "forex",
        "market_count_label": "80+ pairs",
    },
    {
        "name": "Indices",
        "slug": "indices",
        "description": "Get exposure to major global stock indices including the FTSE 100, Wall Street and Germany 40.",
        "icon": "indices",
        "market_count_label": "25+ indices",
    },
    {
        "name": "Shares",
        "slug": "shares",
        "description": "Trade thousands of listed companies across the US, UK, Europe and Asia-Pacific.",
        "icon": "shares",
        "market_count_label": "10,000+ shares",
    },
    {
        "name": "Commodities",
        "slug": "commodities",
        "description": "Access metals, energy and agricultural markets, from gold and oil to wheat and natural gas.",
        "icon": "commodities",
        "market_count_label": "35+ commodities",
    },
    {
        "name": "Cryptocurrencies",
        "slug": "crypto",
        "description": "Speculate on the price movements of major cryptocurrencies without owning the underlying coins.",
        "icon": "crypto",
        "market_count_label": "10+ cryptos",
    },
]

MARKETS = [
    {
        "name": "EUR/USD", "symbol": "EUR/USD", "slug": "eur-usd", "category": "forex",
        "description": "The most actively traded currency pair in the world, tracking the euro against the US dollar.",
        "price_display": "1.0842", "change_percent": "0.12", "spread_from": "0.6 pts",
        "trading_hours": "24 hours, Sunday 22:00 – Friday 22:00 (UK time)",
        "key_facts": ["Most liquid currency pair globally", "Sensitive to ECB and Federal Reserve policy", "Tight spreads due to high trading volume"],
    },
    {
        "name": "GBP/USD", "symbol": "GBP/USD", "slug": "gbp-usd", "category": "forex",
        "description": "Known as 'cable', this pair tracks the British pound against the US dollar.",
        "price_display": "1.2674", "change_percent": "-0.08", "spread_from": "0.9 pts",
        "trading_hours": "24 hours, Sunday 22:00 – Friday 22:00 (UK time)",
        "key_facts": ["Influenced by Bank of England rate decisions", "One of the more volatile major pairs", "Popular with both new and experienced traders"],
    },
    {
        "name": "FTSE 100", "symbol": "UK 100", "slug": "ftse-100", "category": "indices",
        "description": "A benchmark index tracking the 100 largest companies listed on the London Stock Exchange.",
        "price_display": "8,201.4", "change_percent": "0.34", "spread_from": "1 pt",
        "trading_hours": "Mon–Fri, 08:00 – 16:30 (UK time), plus extended hours",
        "key_facts": ["Tracks the UK's largest listed companies", "Heavily weighted toward energy, mining and financials", "Popular for gauging broader UK market sentiment"],
    },
    {
        "name": "Wall Street", "symbol": "US 30", "slug": "wall-street", "category": "indices",
        "description": "Tracks the Dow Jones Industrial Average, a price-weighted index of 30 major US companies.",
        "price_display": "39,845.2", "change_percent": "0.21", "spread_from": "1.6 pts",
        "trading_hours": "Mon–Fri, extended hours available",
        "key_facts": ["One of the most-watched US equity benchmarks", "Price-weighted rather than market-cap weighted", "Reacts strongly to US economic data releases"],
    },
    {
        "name": "Apple", "symbol": "AAPL", "slug": "apple", "category": "shares",
        "description": "Trade the share price movements of Apple Inc., listed on the NASDAQ.",
        "price_display": "$189.30", "change_percent": "0.56", "spread_from": "0.1%",
        "trading_hours": "Mon–Fri, US market hours plus extended hours",
        "key_facts": ["Listed on the NASDAQ under ticker AAPL", "Component of major indices including the US Tech 100", "Quarterly earnings often drive short-term volatility"],
    },
    {
        "name": "Gold", "symbol": "Spot Gold", "slug": "gold", "category": "commodities",
        "description": "One of the most traded commodities in the world, often viewed as a store of value.",
        "price_display": "$2,338.50", "change_percent": "-0.14", "spread_from": "0.3 pts",
        "trading_hours": "Sunday 23:00 – Friday 22:00 (UK time), with a daily break",
        "key_facts": ["Traditionally viewed as a hedge against inflation", "Sensitive to US dollar strength and real interest rates", "Trades nearly around the clock across global sessions"],
    },
    {
        "name": "Bitcoin", "symbol": "BTC/USD", "slug": "bitcoin", "category": "crypto",
        "description": "Speculate on Bitcoin price movements without needing a crypto wallet or exchange account.",
        "price_display": "$64,120", "change_percent": "1.85", "spread_from": "0.5%",
        "trading_hours": "24/7",
        "key_facts": ["The largest cryptocurrency by market capitalisation", "Known for significant price volatility", "Trades continuously, including weekends"],
    },
]

RELATED = {
    "eur-usd": ["gbp-usd"],
    "gbp-usd": ["eur-usd"],
    "ftse-100": ["wall-street"],
    "wall-street": ["ftse-100"],
}


class Command(BaseCommand):
    help = "Seed illustrative market categories and markets for the demo marketing site."

    def handle(self, *args, **options):
        cat_objs = {}
        for c in CATEGORIES:
            obj, _ = MarketCategory.objects.update_or_create(slug=c["slug"], defaults=c)
            cat_objs[c["slug"]] = obj
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(cat_objs)} categories"))

        market_objs = {}
        for m in MARKETS:
            data = {k: v for k, v in m.items() if k not in ("category", "key_facts")}
            data["category"] = cat_objs[m["category"]]
            obj, _ = Market.objects.update_or_create(slug=m["slug"], defaults=data)
            obj.key_facts.all().delete()
            for i, fact in enumerate(m["key_facts"]):
                MarketKeyFact.objects.create(market=obj, text=fact, order=i)
            market_objs[m["slug"]] = obj

        for slug, related_slugs in RELATED.items():
            market_objs[slug].related_markets.set([market_objs[s] for s in related_slugs])

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(market_objs)} markets"))
