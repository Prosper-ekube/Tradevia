from django.contrib import admin

from .models import EducationalArticle


@admin.register(EducationalArticle)
class EducationalArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "level", "reading_minutes", "published_at"]
    list_filter = ["level", "category"]
    search_fields = ["title", "excerpt"]
    prepopulated_fields = {"slug": ("title",)}
