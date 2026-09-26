import { Link } from 'react-router-dom'
import type { EducationalArticle } from '@/types'
import LevelBadge from './LevelBadge'

const ArticleCard: React.FC<{ article: EducationalArticle }> = ({ article }) => (
  <Link
    to={`/education/${article.slug}`}
    className="group block rounded-2xl border border-ink-900/10 bg-white overflow-hidden hover:border-brand-500/40 hover:shadow-panel transition-all"
  >
    <div className="p-6">
      <div className="flex items-center gap-2">
        <LevelBadge level={article.level} />
        <span className="text-xs text-ink-700/60">{article.category}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-ink-950 leading-snug group-hover:text-brand-700 transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-ink-700/80 leading-relaxed">{article.excerpt}</p>
      <p className="mt-4 text-xs text-ink-700/50">{article.readingMinutes} min read &middot; {article.author}</p>
    </div>
  </Link>
)

export default ArticleCard
