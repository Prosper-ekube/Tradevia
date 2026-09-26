import { Link } from 'react-router-dom'
import type { Market } from '@/types'
import PriceChangeTag from './PriceChangeTag'
import EmptyState from '@/components/common/EmptyState'

const MarketTable: React.FC<{ markets: Market[] }> = ({ markets }) => {
  if (markets.length === 0) {
    return <EmptyState title="No markets found" description="Try a different search or category." />
  }

  return (
    <>
      {/* Table for tablet and up */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-ink-900/10">
        <table className="w-full text-sm">
          <thead className="bg-ink-900/[0.03] text-ink-700/70 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left font-medium px-4 py-3">Market</th>
              <th className="text-right font-medium px-4 py-3">Price</th>
              <th className="text-right font-medium px-4 py-3">Change</th>
              <th className="text-right font-medium px-4 py-3">Spread from</th>
              <th className="text-right font-medium px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/10">
            {markets.map((m) => (
              <tr key={m.id} className="hover:bg-ink-900/[0.02]">
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-ink-950">{m.name}</p>
                  <p className="text-xs text-ink-700/60 font-mono">{m.symbol}</p>
                </td>
                <td className="px-4 py-3.5 text-right font-mono tabular-nums">{m.price}</td>
                <td className="px-4 py-3.5 text-right">
                  <PriceChangeTag value={m.changePercent} />
                </td>
                <td className="px-4 py-3.5 text-right text-ink-700/70">{m.spreadFrom}</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-700/70">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${m.status === 'open' ? 'bg-signal-up' : 'bg-ink-700/40'}`}
                    />
                    {m.status === 'open' ? 'Market open' : 'Market closed'}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    to={`/markets/${m.categorySlug}/${m.slug}`}
                    className="text-brand-600 font-semibold hover:text-brand-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="sm:hidden space-y-3">
        {markets.map((m) => (
          <Link
            key={m.id}
            to={`/markets/${m.categorySlug}/${m.slug}`}
            className="block rounded-xl border border-ink-900/10 p-4 bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink-950">{m.name}</p>
                <p className="text-xs text-ink-700/60 font-mono">{m.symbol}</p>
              </div>
              <PriceChangeTag value={m.changePercent} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-mono tabular-nums">{m.price}</span>
              <span className="text-ink-700/60 text-xs">Spread from {m.spreadFrom}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default MarketTable
