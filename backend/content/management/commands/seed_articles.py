from django.core.management.base import BaseCommand

from content.models import EducationalArticle

ARTICLES = [
    {
        "title": "What is CFD trading and how does it work?",
        "slug": "what-is-cfd-trading",
        "excerpt": "Understand the basics of contracts for difference, how leverage works and the risks involved.",
        "content": (
            "A contract for difference (CFD) is an agreement to exchange the difference in the price of "
            "an asset between when a position is opened and when it is closed, without owning the "
            "underlying asset.\n\n"
            "CFDs are leveraged products, meaning you only need to put up a fraction of the full trade "
            "value as margin. This can magnify both profits and losses relative to your outlay.\n\n"
            "Because you never own the underlying asset, CFDs allow you to speculate on both rising and "
            "falling prices by going long or short.\n\n"
            "Risk management tools such as stop-loss orders are an important part of trading CFDs "
            "responsibly, given the amplifying effect of leverage."
        ),
        "category": "Fundamentals", "level": "Beginner", "reading_minutes": 6, "published_at": "2025-11-02",
    },
    {
        "title": "Spread betting explained",
        "slug": "spread-betting-explained",
        "excerpt": "A look at how financial spread betting works and how it differs from CFD trading.",
        "content": (
            "Spread betting lets you speculate on the price movement of a financial market without "
            "owning the underlying asset, by placing a bet per point of movement.\n\n"
            "In the UK and Ireland, spread betting profits are typically free from capital gains tax, "
            "though tax treatment depends on individual circumstances.\n\n"
            "Like CFDs, spread bets are leveraged, so losses can exceed your initial deposit if positions "
            "move against you.\n\n"
            "Spread betting was pioneered in the UK in the 1970s and remains a popular way for retail "
            "traders to access financial markets."
        ),
        "category": "Fundamentals", "level": "Beginner", "reading_minutes": 5, "published_at": "2025-10-18",
    },
    {
        "title": "Understanding leverage and margin",
        "slug": "understanding-leverage-and-margin",
        "excerpt": "How leverage amplifies both gains and losses, and why margin management matters.",
        "content": (
            "Leverage allows you to gain a larger market exposure than the capital you put down, known "
            "as margin.\n\n"
            "While leverage can increase potential returns, it equally increases potential losses, which "
            "can exceed your deposited funds.\n\n"
            "Margin requirements vary by market and are typically higher for more volatile instruments.\n\n"
            "Monitoring your margin level and using risk-management tools helps avoid positions being "
            "automatically closed."
        ),
        "category": "Risk management", "level": "Beginner", "reading_minutes": 7, "published_at": "2025-09-30",
    },
    {
        "title": "An introduction to technical analysis",
        "slug": "introduction-to-technical-analysis",
        "excerpt": "How traders use charts, patterns and indicators to inform trading decisions.",
        "content": (
            "Technical analysis is the study of historical price and volume data to identify patterns "
            "that may indicate future price behaviour.\n\n"
            "Common tools include trendlines, moving averages, support and resistance levels, and "
            "momentum indicators such as the RSI.\n\n"
            "No technique guarantees future performance, and technical analysis is often used alongside "
            "fundamental analysis and sound risk management.\n\n"
            "Charting platforms typically offer dozens of built-in indicators and drawing tools to "
            "support this style of analysis."
        ),
        "category": "Strategy", "level": "Intermediate", "reading_minutes": 8, "published_at": "2025-09-12",
    },
    {
        "title": "Building a trading plan",
        "slug": "building-a-trading-plan",
        "excerpt": "Why a written trading plan can help bring structure and discipline to your trading.",
        "content": (
            "A trading plan sets out your goals, the markets you'll trade, your risk tolerance and the "
            "rules you'll follow for entering and exiting positions.\n\n"
            "Defining position sizing and maximum loss per trade in advance can help reduce impulsive "
            "decision-making.\n\n"
            "Reviewing and adjusting your plan periodically, based on a trading journal, is a common "
            "practice among more experienced traders.\n\n"
            "A trading plan does not eliminate risk, but it can bring more consistency to your approach."
        ),
        "category": "Strategy", "level": "Intermediate", "reading_minutes": 6, "published_at": "2025-08-25",
    },
    {
        "title": "Managing risk: stop-losses and limits explained",
        "slug": "managing-risk-stop-losses-and-limits",
        "excerpt": "A practical look at the order types traders use to manage downside risk.",
        "content": (
            "A stop-loss order automatically closes a position once the market reaches a specified, "
            "less favourable price.\n\n"
            "A guaranteed stop, where available, closes your position at the exact level requested "
            "regardless of market gapping, typically for a premium.\n\n"
            "Limit orders can be used to automatically take profit once a market reaches a specified, "
            "more favourable level.\n\n"
            "Combining stop-losses with sensible position sizing is a core part of many traders' "
            "risk-management approach."
        ),
        "category": "Risk management", "level": "Beginner", "reading_minutes": 5, "published_at": "2025-08-04",
    },
]


class Command(BaseCommand):
    help = "Seed illustrative educational articles for the demo marketing site."

    def handle(self, *args, **options):
        for a in ARTICLES:
            EducationalArticle.objects.update_or_create(slug=a["slug"], defaults=a)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(ARTICLES)} articles"))
