export interface MarketCategory {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  marketCount: string
}

export type MarketStatus = 'open' | 'closed' | 'pre-market'

export interface Market {
  id: number
  name: string
  symbol: string
  categorySlug: string
  slug: string
  description: string
  price?: string
  changePercent?: number
  spreadFrom?: string
  status: MarketStatus
  tradingHours?: string
  keyFacts?: string[]
  relatedSlugs?: string[]
}

export interface EducationalArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string[]
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  readingMinutes: number
  author: string
  publishedAt: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  title: string
  items: FaqItem[]
}

export interface NavChild {
  label: string
  to: string
  description?: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavChild[]
}

export type RequestState = 'idle' | 'loading' | 'success' | 'error'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  category: string
}
