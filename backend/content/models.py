from django.db import models


class EducationalArticle(models.Model):
    LEVEL_CHOICES = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField()
    content = models.TextField(help_text="Article body. Paragraphs separated by blank lines.")
    category = models.CharField(max_length=80)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="Beginner")
    reading_minutes = models.PositiveSmallIntegerField(default=5)
    author = models.CharField(max_length=100, default="IG Education Team")
    featured_image = models.URLField(blank=True)
    published_at = models.DateField()

    class Meta:
        ordering = ["-published_at"]

    def __str__(self) -> str:
        return self.title

    @property
    def content_paragraphs(self):
        return [p.strip() for p in self.content.split("\n\n") if p.strip()]
