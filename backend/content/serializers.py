from rest_framework import serializers

from .models import EducationalArticle


class ArticleListSerializer(serializers.ModelSerializer):
    readingMinutes = serializers.IntegerField(source="reading_minutes")
    publishedAt = serializers.DateField(source="published_at")

    class Meta:
        model = EducationalArticle
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "category",
            "level",
            "readingMinutes",
            "author",
            "publishedAt",
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    readingMinutes = serializers.IntegerField(source="reading_minutes")
    publishedAt = serializers.DateField(source="published_at")

    class Meta:
        model = EducationalArticle
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "category",
            "level",
            "readingMinutes",
            "author",
            "publishedAt",
        ]

    def get_content(self, obj):
        return obj.content_paragraphs
