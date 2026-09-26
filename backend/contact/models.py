from django.db import models


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("in_progress", "In progress"),
        ("resolved", "Resolved"),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    category = models.CharField(max_length=60, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.subject} ({self.email})"
