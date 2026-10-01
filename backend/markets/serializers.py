from rest_framework import serializers

from .models import Market, MarketCategory


class MarketCategorySerializer(serializers.ModelSerializer):
    marketCount = serializers.CharField(source="market_count_label")

    class Meta:
        model = MarketCategory
        fields = ["id", "name", "slug", "description", "icon", "marketCount"]


class MarketListSerializer(serializers.ModelSerializer):
    categorySlug = serializers.SlugField(
        source="category.slug", read_only=True)
    price = serializers.CharField(source="price_display")
    changePercent = serializers.FloatField(
        source="change_percent", allow_null=True)
    spreadFrom = serializers.CharField(source="spread_from")

    class Meta:
        model = Market
        fields = [
            "id",
            "name",
            "symbol",
            "slug",
            "categorySlug",
            "description",
            "price",
            "changePercent",
            "spreadFrom",
            "status",
        ]


class MarketDetailSerializer(serializers.ModelSerializer):
    categorySlug = serializers.SlugField(
        source="category.slug", read_only=True)
    price = serializers.CharField(source="price_display")
    changePercent = serializers.FloatField(
        source="change_percent", allow_null=True)
    spreadFrom = serializers.CharField(source="spread_from")
    tradingHours = serializers.CharField(source="trading_hours")
    keyFacts = serializers.SlugRelatedField(
        source="key_facts", slug_field="text", many=True, read_only=True)
    relatedSlugs = serializers.SlugRelatedField(
        source="related_markets", slug_field="slug", many=True, read_only=True
    )

    class Meta:
        model = Market
        fields = [
            "id",
            "name",
            "symbol",
            "slug",
            "categorySlug",
            "description",
            "price",
            "changePercent",
            "spreadFrom",
            "status",
            "tradingHours",
            "keyFacts",
            "relatedSlugs",
        ]


class LiveMarketSerializer(serializers.ModelSerializer):
    """
    Serializer for the live markets endpoint.
    Combines database metadata with real-time pricing from Twelve Data.
    """
    categorySlug = serializers.SlugField(
        source="category.slug", read_only=True)
    price = serializers.SerializerMethodField()
    changePercent = serializers.SerializerMethodField()
    spreadFrom = serializers.CharField(source="spread_from")
    status = serializers.SerializerMethodField()

    class Meta:
        model = Market
        fields = [
            "id",
            "name",
            "symbol",
            "slug",
            "categorySlug",
            "description",
            "price",
            "changePercent",
            "spreadFrom",
            "status",
        ]

    def _get_live_data(self, obj):
        """Pull this market's live payload from the serializer context."""
        live_data = self.context.get("live_data") or {}
        return live_data.get(obj.symbol)

    def get_price(self, obj):
        data = self._get_live_data(obj)
        if data and "close" in data:
            return data["close"]
        return obj.price_display

    def get_changePercent(self, obj):
        data = self._get_live_data(obj)
        if data and "percent_change" in data:
            try:
                return float(data["percent_change"])
            except (TypeError, ValueError):
                pass
        return obj.change_percent

    def get_status(self, obj):
        data = self._get_live_data(obj)
        if data and "is_market_open" in data:
            return "open" if data["is_market_open"] else "closed"
        return obj.status