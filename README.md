# IG — Marketing Website (Concept / Portfolio Build)

A complete, responsive **marketing website** for the real brokerage **IG**, built as an
independent concept/demo project. It recreates the information architecture, content
depth and UX patterns of a major online brokerage's public-facing site — markets,
trading information, education, company pages, support — **without implementing any of
IG's actual trading infrastructure**.

> **This is not an official IG website.** It is not affiliated with, endorsed by, or
> operated by IG Group Holdings plc. It exists for educational/portfolio purposes only,
> and references publicly available information about IG for realism. IG and any
> associated marks are trademarks of their respective owners. See the disclaimer in the
> site footer.

## What this is — and isn't

**Is:**
- A public marketing website: homepage, markets pages, trading information, education
  articles, company pages, contact, FAQ, and account-opening/login *flows*.
- A small Django REST API acting as a CMS layer for markets, articles and contact
  messages, plus a simple demo registration/login endpoint (token-based).

**Is not:**
- A trading engine. There is no order execution, portfolio management, deposits,
  withdrawals, margin/liquidation engine, KYC/AML pipeline, or connection to any real
  liquidity provider or financial ledger. All prices, spreads and percentage moves shown
  in the UI are clearly-labelled **illustrative placeholder data**, not live market data.

---

## Features

- Full IG-inspired information architecture: Markets (with category and individual
  instrument pages), Trading (platforms, accounts, fees, conditions, tools), Education
  (articles with filtering), Company (About, Why IG, Contact, FAQ), and account
  entry flows (Login, Open account, Demo account).
- Small, focused, reusable React components — no giant page files.
- A typed service layer (`src/services`) that calls the Django API and gracefully falls
  back to bundled demo data if the API isn't running, so the UI is always explorable.
- Loading / success / empty / error states on every API-driven section.
- Fully responsive from **320px** through **2560px+**, mobile-first, with a dedicated
  mobile navigation drawer, table→card collapse for market data, and fluid typography.
- Accessible: semantic landmarks, labelled forms, visible focus states, keyboard-operable
  navigation and accordions.
- Subtle Framer Motion entrance/transition animation, respecting `prefers-reduced-motion`.

---

## Tech stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS 3.4.17, React Router 6, React
Icons, Framer Motion.

**Backend:** Python, Django 5, Django REST Framework, django-cors-headers, SQLite (dev).

---

## Architecture

```text
ig-marketing-site/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/        # Container, Section, Button, Accordion, states, RiskBanner
│   │   │   ├── layout/         # Header, Footer
│   │   │   ├── navigation/     # NavDropdown, MobileNav
│   │   │   ├── hero/           # Hero
│   │   │   ├── home/           # Homepage-only sections (composed from smaller pieces)
│   │   │   ├── markets/        # MarketCard, MarketTable, CategoryNav, CategoryCard
│   │   │   ├── trading/        # PlatformCard, AccountTypeCard, FeatureGrid, StatStrip
│   │   │   ├── education/      # ArticleCard, LevelBadge
│   │   │   ├── forms/          # FormField, ContactForm, AuthForm
│   │   │   └── account/        # AccountCta
│   │   ├── layouts/            # MainLayout (Header + Outlet + Footer)
│   │   ├── pages/               # One file per route, composed from the components above
│   │   ├── routes/              # AppRoutes.tsx — the full route table
│   │   ├── services/            # api.ts + one service per resource
│   │   ├── hooks/                # useFetch, useMediaQuery, useLockBodyScroll
│   │   ├── types/                # Shared TypeScript types
│   │   ├── data/                  # Bundled demo data (mirrors the API shape)
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.ts
│   └── .env.example
│
├── backend/
│   ├── config/          # Django project settings/urls
│   ├── markets/         # MarketCategory, Market, MarketKeyFact + API
│   ├── content/         # EducationalArticle + API
│   ├── contact/         # ContactMessage + API
│   ├── users/            # Registration / token login / profile
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
└── README.md
```

**File naming convention:** `.tsx` for every file that contains JSX (components, pages,
layouts, routes); `.ts` for everything else (types, services, data, utils, hooks).

### Route map

```text
/                                   Home
/markets                            All markets (search)
/markets/:categorySlug              Category listing (forex, indices, shares, commodities, crypto)
/markets/:categorySlug/:instrument  Individual instrument page (marketing/info only)

/trading                            Trading overview
/trading/platforms
/trading/accounts
/trading/fees
/trading/conditions
/trading/tools

/education                          Article listing (filter by level)
/education/:slug                    Article detail

/about
/why-ig
/contact
/faq

/login
/open-account
/demo-account

*                                   404
```

### API overview

All endpoints are namespaced under `/api/`. List responses are **not paginated** (small,
marketing-scale datasets) and every field is camelCase to match the frontend types
directly — no client-side field mapping needed.

```text
GET  /api/categories/               Market categories
GET  /api/categories/:slug/

GET  /api/markets/                  All markets (optional ?category=<slug>)
GET  /api/markets/:slug/            Market detail (facts, related markets)

GET  /api/articles/                 Articles (optional ?level=&category=)
GET  /api/articles/:slug/

POST /api/contact/                  Create a contact message

POST /api/auth/register/            { email, password, fullName } → { token }
POST /api/auth/login/               { email, password } → { token }
POST /api/auth/logout/              (auth required)
GET  /api/profile/                  (auth required)
```

The `users` app implements a simple demo authentication flow (DRF token auth) so the
Login / Open account / Demo account pages have something real to talk to — there is no
KYC, funding, or brokerage account state behind it.

---

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Backend setup

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_markets     # loads demo categories/markets
python manage.py seed_articles    # loads demo education articles
python manage.py createsuperuser  # optional, for /admin/
python manage.py runserver
```

The API is now available at `http://localhost:8000/api/`, and the admin at
`http://localhost:8000/admin/`.

### Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # points VITE_API_BASE_URL at the backend above
npm run dev
```

The site is now available at `http://localhost:5173`.

> If the backend isn't running, the frontend still works — every service call falls
> back to bundled demo data in `src/data/`, so the whole UI stays explorable.

### Building for production

```bash
cd frontend && npm run build   # outputs to frontend/dist
```

---

## Environment variables

**frontend/.env**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**backend/.env**
```env
DJANGO_SECRET_KEY=
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Never commit real secrets — `.env` is git-ignored in both apps; only `.env.example` is
tracked.

---

## Responsive design notes

Built mobile-first from a 320px baseline up through large desktop:

- **320–430px:** single-column layouts throughout; the header collapses to a logo + menu
  button; the mobile nav is a full-height slide-out drawer; market tables become stacked
  cards below the `sm` breakpoint; hero and stat grids drop to 1–2 columns; all
  interactive targets stay comfortably tappable; nothing overflows horizontally (category
  chip rows and any wide tables scroll within their own container, not the page).
- **768–1024px (tablet):** grids move to 2–3 columns; the market table (not cards) takes
  over from `sm:` upward.
- **1024px+ (desktop):** full desktop navigation with hover/click dropdowns; 3–6 column
  grids where content allows.
- **1280–2560px+:** content is capped at a `max-w-content` (1320px) container with
  generous side padding, so large screens get intentional whitespace rather than
  stretched, full-bleed text and cards.

All colour tokens meet reasonable contrast on their backgrounds; focus states are
visible (`:focus-visible` outline); the mobile drawer traps body scroll while open and is
dismissible via backdrop click or the close button; `prefers-reduced-motion` disables
transition/animation durations globally.

---

## Development notes

- **Component size:** every page is a thin composition of small, single-purpose
  components (e.g. `Home.tsx` only arranges `Hero`, `MarketOverview`,
  `WhyIgSection`, etc.) — no 1,000-line page files.
- **Service layer:** components never call `fetch` directly; they go through
  `src/services/*Service.ts`, which centralises the base URL, error handling, and (for
  markets/articles) a fallback to bundled data.
- **No real financial data:** prices, spreads and percentage changes are placeholder
  values for demonstrating the UI, clearly labelled "illustrative" in the interface —
  they are not connected to any live feed.
- **No trading infrastructure:** the Django models intentionally stop at "marketing
  content" (categories, markets-as-content, articles, contact messages, a simple demo
  user). There is no order book, ledger, position, or payment model anywhere in the
  codebase.
- **Company facts:** history/stats used in the About and homepage stats sections (e.g.
  founding year, exchange listing, regulator) are drawn from publicly available
  information about IG Group. Anything that couldn't be verified was left out rather
  than invented.
