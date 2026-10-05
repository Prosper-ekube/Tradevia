import type { Market, MarketCategory } from '@/types'

export const marketCategories: MarketCategory[] = [
  {
    id: 1,
    name: 'Forex',
    slug: 'forex',
    description: 'Over 80 currency pairs available through IG, from majors like EUR/USD to emerging-market crosses.',
    icon: 'forex',
    marketCount: '80+ pairs',
  },
  {
    id: 2,
    name: 'Indices',
    slug: 'indices',
    description: 'Exposure to major global stock indices including the FTSE 100, Wall Street and Germany 40.',
    icon: 'indices',
    marketCount: '25+ indices',
  },
  {
    id: 3,
    name: 'Shares',
    slug: 'shares',
    description: 'Thousands of listed companies across the US, UK, Europe and Asia-Pacific.',
    icon: 'shares',
    marketCount: '10,000+ shares',
  },
  {
    id: 4,
    name: 'Commodities',
    slug: 'commodities',
    description: 'Metals, energy and agricultural markets, from gold and oil to wheat and natural gas.',
    icon: 'commodities',
    marketCount: '35+ commodities',
  },
  {
    id: 5,
    name: 'Cryptocurrencies',
    slug: 'crypto',
    description: 'Price movements in major cryptocurrencies, tradeable without owning the underlying coins.',
    icon: 'crypto',
    marketCount: '10+ cryptos',
  },
]

// Note: prices, spreads and percentage moves below are illustrative placeholder
// values for demonstrating the UI. They are not live market data.
export const markets: Market[] = [
  {
    id: 1,
    name: 'EUR/USD',
    symbol: 'EUR/USD',
    categorySlug: 'forex',
    slug: 'eur-usd',
    description: 'The most actively traded currency pair in the world, tracking the euro against the US dollar.',
    price: '1.0842',
    changePercent: 0.12,
    spreadFrom: '0.6 pts',
    status: 'open',
    tradingHours: '24 hours, Sunday 22:00 – Friday 22:00 (UK time)',
    keyFacts: [
      'Most liquid currency pair globally',
      'Sensitive to ECB and Federal Reserve policy',
      'Tight spreads due to high trading volume',
    ],
    relatedSlugs: ['gbp-usd'],
  },
  {
    id: 2,
    name: 'GBP/USD',
    symbol: 'GBP/USD',
    categorySlug: 'forex',
    slug: 'gbp-usd',
    description: "Known as 'cable', this pair tracks the British pound against the US dollar.",
    price: '1.2674',
    changePercent: -0.08,
    spreadFrom: '0.9 pts',
    status: 'open',
    tradingHours: '24 hours, Sunday 22:00 – Friday 22:00 (UK time)',
    keyFacts: [
      'Influenced by Bank of England rate decisions',
      'One of the more volatile major pairs',
      'Popular with both new and experienced traders',
    ],
    relatedSlugs: ['eur-usd'],
  },
  {
    id: 3,
    name: 'FTSE 100',
    symbol: 'UK 100',
    categorySlug: 'indices',
    slug: 'ftse-100',
    description: "A benchmark index tracking the 100 largest companies listed on the London Stock Exchange.",
    price: '8,201.4',
    changePercent: 0.34,
    spreadFrom: '1 pt',
    status: 'open',
    tradingHours: 'Mon–Fri, 08:00 – 16:30 (UK time), plus extended hours',
    keyFacts: [
      'Tracks the UK\'s largest listed companies',
      'Heavily weighted toward energy, mining and financials',
      'Popular for gauging broader UK market sentiment',
    ],
    relatedSlugs: ['wall-street'],
  },
  {
    id: 4,
    name: 'Wall Street',
    symbol: 'US 30',
    categorySlug: 'indices',
    slug: 'wall-street',
    description: 'Tracks the Dow Jones Industrial Average, a price-weighted index of 30 major US companies.',
    price: '39,845.2',
    changePercent: 0.21,
    spreadFrom: '1.6 pts',
    status: 'open',
    tradingHours: 'Mon–Fri, extended hours available',
    keyFacts: [
      'One of the most-watched US equity benchmarks',
      'Price-weighted rather than market-cap weighted',
      'Reacts strongly to US economic data releases',
    ],
    relatedSlugs: ['ftse-100'],
  },
  {
    id: 5,
    name: 'Apple',
    symbol: 'AAPL',
    categorySlug: 'shares',
    slug: 'apple',
    description: 'The share price of Apple Inc., listed on the NASDAQ.',
    price: '$189.30',
    changePercent: 0.56,
    spreadFrom: '0.1%',
    status: 'open',
    tradingHours: 'Mon–Fri, US market hours plus extended hours',
    keyFacts: [
      'Listed on the NASDAQ under ticker AAPL',
      'Component of major indices including the US Tech 100',
      'Quarterly earnings often drive short-term volatility',
    ],
    relatedSlugs: [],
  },
  {
    id: 6,
    name: 'Gold',
    symbol: 'Spot Gold',
    categorySlug: 'commodities',
    slug: 'gold',
    description: 'One of the most traded commodities in the world, often viewed as a store of value.',
    price: '$2,338.50',
    changePercent: -0.14,
    spreadFrom: '0.3 pts',
    status: 'open',
    tradingHours: 'Sunday 23:00 – Friday 22:00 (UK time), with a daily break',
    keyFacts: [
      'Traditionally viewed as a hedge against inflation',
      'Sensitive to US dollar strength and real interest rates',
      'Trades nearly around the clock across global sessions',
    ],
    relatedSlugs: [],
  },
  {
    id: 7,
    name: 'Bitcoin',
    symbol: 'BTC/USD',
    categorySlug: 'crypto',
    slug: 'bitcoin',
    description: 'The largest cryptocurrency by market capitalisation, with prices quoted against the US dollar.',
    price: '$64,120',
    changePercent: 1.85,
    spreadFrom: '0.5%',
    status: 'open',
    tradingHours: '24/7',
    keyFacts: [
      'The largest cryptocurrency by market capitalisation',
      'Known for significant price volatility',
      'Trades continuously, including weekends',
    ],
    relatedSlugs: [],
  },
]

export function getCategoryBySlug(slug: string) {
  return marketCategories.find((c) => c.slug === slug)
}

export function getMarketsByCategory(slug: string) {
  return markets.filter((m) => m.categorySlug === slug)
}

export function getMarketBySlug(slug: string) {
  return markets.find((m) => m.slug === slug)
}