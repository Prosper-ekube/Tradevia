from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Market, MarketCategory
from .serializers import (
    MarketCategorySerializer,
    MarketDetailSerializer,
    MarketListSerializer,
)


class MarketCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarketCategory.objects.all()
    serializer_class = MarketCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    pagination_class = None


class MarketViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Market.objects.select_related("category").prefetch_related("key_facts", "related_markets")
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
