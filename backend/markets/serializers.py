from rest_framework import serializers

from .models import Market, MarketCategory


class MarketCategorySerializer(serializers.ModelSerializer):
    marketCount = serializers.CharField(source="market_count_label")

    class Meta:
        model = MarketCategory
        fields = ["id", "name", "slug", "description", "icon", "marketCount"]


class MarketListSerializer(serializers.ModelSerializer):
    categorySlug = serializers.SlugField(source="category.slug", read_only=True)
    price = serializers.CharField(source="price_display")
    changePercent = serializers.FloatField(source="change_percent", allow_null=True)
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
    categorySlug = serializers.SlugField(source="category.slug", read_only=True)
    price = serializers.CharField(source="price_display")
    changePercent = serializers.FloatField(source="change_percent", allow_null=True)
    spreadFrom = serializers.CharField(source="spread_from")
    tradingHours = serializers.CharField(source="trading_hours")
    keyFacts = serializers.SlugRelatedField(source="key_facts", slug_field="text", many=True, read_only=True)
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
