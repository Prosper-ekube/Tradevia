from rest_framework.routers import DefaultRouter
from .views import MarketCategoryViewSet, MarketViewSet, LiveMarketViewSet

router = DefaultRouter()
router.register("categories", MarketCategoryViewSet, basename="category")
router.register("markets", MarketViewSet, basename="market")
router.register("live-markets", LiveMarketViewSet, basename="live-market")

urlpatterns = router.urls