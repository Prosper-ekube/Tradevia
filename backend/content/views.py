from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import EducationalArticle
from .serializers import ArticleDetailSerializer, ArticleListSerializer


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EducationalArticle.objects.all()
    permission_classes = [AllowAny]
    lookup_field = "slug"
    pagination_class = None

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ArticleDetailSerializer
        return ArticleListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        level = self.request.query_params.get("level")
        category = self.request.query_params.get("category")
        if level:
            queryset = queryset.filter(level=level)
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset
