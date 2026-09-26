import { api } from './api'
import { articles } from '@/data/education'
import type { EducationalArticle } from '@/types'

export const articleService = {
  async getArticles(): Promise<EducationalArticle[]> {
    try {
      return await api.get<EducationalArticle[]>('/articles/')
    } catch {
      return articles
    }
  },

  async getArticleBySlug(slug: string): Promise<EducationalArticle | undefined> {
    try {
      return await api.get<EducationalArticle>(`/articles/${slug}/`)
    } catch {
      return articles.find((a) => a.slug === slug)
    }
  },
}
