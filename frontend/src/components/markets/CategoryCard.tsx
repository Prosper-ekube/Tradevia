import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import type { MarketCategory } from '@/types'

const CategoryCard: React.FC<{ category: MarketCategory }> = ({ category }) => (
  <Link
    to={`/markets/${category.slug}`}
    className="group block rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-500/40 hover:shadow-panel transition-all"
  >
    <div className="flex items-start justify-between">
      <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{category.marketCount}</p>
      <FiArrowUpRight className="text-ink-700/40 group-hover:text-brand-600 transition-colors" />
    </div>
    <h3 className="mt-3 text-xl font-semibold text-ink-950">{category.name}</h3>
    <p className="mt-2 text-sm text-ink-700/75 leading-relaxed">{category.description}</p>
  </Link>
)

export default CategoryCard
