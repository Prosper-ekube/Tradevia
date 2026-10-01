import { api } from './api'
import { marketCategories, markets } from '@/data/markets'
import type { Market, MarketCategory } from '@/types'

// The live backend exposes /api/categories/ and /api/markets/. Since this is a
// marketing-site prototype, we fall back to bundled data if the API is not
// reachable so the UI remains fully explorable without a running backend.

export const marketService = {
  async getCategories(): Promise<MarketCategory[]> {
    try {
      return await api.get<MarketCategory[]>('/categories/')
    } catch {
      return marketCategories
    }
  },

  async getMarkets(categorySlug?: string): Promise<Market[]> {
    try {
      const query = categorySlug ? `?category=${categorySlug}` : ''
      return await api.get<Market[]>(`/markets/${query}`)
    } catch {
      return categorySlug ? markets.filter((m) => m.categorySlug === categorySlug) : markets
    }
  },

  async getMarketBySlug(slug: string): Promise<Market | undefined> {
    try {
      return await api.get<Market>(`/markets/${slug}/`)
    } catch {
      return markets.find((m) => m.slug === slug)
    }
  },

  async getLiveMarkets(): Promise<Market[]> {
    return api.get<Market[]>('/live-markets/')
  },
}
