from django.db import models


class MarketCategory(models.Model):
    name = models.CharField(max_length=80)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=40, blank=True, help_text="Icon identifier used by the frontend")
    market_count_label = models.CharField(
        max_length=40, blank=True, help_text="Display label, e.g. '80+ pairs'"
    )

    class Meta:
        verbose_name_plural = "market categories"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Market(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("pre-market", "Pre-market"),
    ]

    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=20)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(MarketCategory, related_name="markets", on_delete=models.CASCADE)
    description = models.TextField(blank=True)

    # Illustrative/demo fields only — this is a marketing prototype, not a
    # live pricing feed. These are not connected to any real market data.
    price_display = models.CharField(max_length=30, blank=True)
    change_percent = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    spread_from = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default="open")
    trading_hours = models.CharField(max_length=200, blank=True)

    related_markets = models.ManyToManyField("self", blank=True, symmetrical=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.symbol})"


class MarketKeyFact(models.Model):
    market = models.ForeignKey(Market, related_name="key_facts", on_delete=models.CASCADE)
    text = models.CharField(max_length=280)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.text
