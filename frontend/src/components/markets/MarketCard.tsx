import { Link } from 'react-router-dom'
import type { Market } from '@/types'
import PriceChangeTag from './PriceChangeTag'

const MarketCard: React.FC<{ market: Market }> = ({ market }) => (
  <Link
    to={`/markets/${market.categorySlug}/${market.slug}`}
    className="block rounded-2xl border border-ink-900/10 bg-white p-5 hover:border-brand-500/40 hover:shadow-panel transition-all"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-semibold text-ink-950">{market.name}</p>
        <p className="text-xs text-ink-700/60 font-mono mt-0.5">{market.symbol}</p>
      </div>
      <PriceChangeTag value={market.changePercent} />
    </div>
    <div className="mt-4 flex items-end justify-between">
      <span className="font-mono text-lg font-semibold text-ink-950 tabular-nums">{market.price}</span>
      {market.spreadFrom && (
        <span className="text-xs text-ink-700/60">Spread from {market.spreadFrom}</span>
      )}
    </div>
  </Link>
)

export default MarketCard
