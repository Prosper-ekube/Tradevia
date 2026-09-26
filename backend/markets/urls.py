from rest_framework.routers import DefaultRouter

from .views import MarketCategoryViewSet, MarketViewSet

router = DefaultRouter()
router.register("categories", MarketCategoryViewSet, basename="category")
router.register("markets", MarketViewSet, basename="market")

urlpatterns = router.urls
