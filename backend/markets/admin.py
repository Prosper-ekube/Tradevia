from django.contrib import admin

from .models import Market, MarketCategory, MarketKeyFact


class MarketKeyFactInline(admin.TabularInline):
    model = MarketKeyFact
    extra = 1


@admin.register(MarketCategory)
class MarketCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "market_count_label"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Market)
class MarketAdmin(admin.ModelAdmin):
    list_display = ["name", "symbol", "category", "status", "price_display"]
    list_filter = ["category", "status"]
    search_fields = ["name", "symbol"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [MarketKeyFactInline]
