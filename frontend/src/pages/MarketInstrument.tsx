import { useMemo } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import ErrorState from '@/components/common/ErrorState'
import PriceChangeTag from '@/components/markets/PriceChangeTag'
import MarketCard from '@/components/markets/MarketCard'
import AccountCta from '@/components/account/AccountCta'
import RiskBanner from '@/components/common/RiskBanner'
import { useLiveMarkets } from '@/hooks/useLiveMarkets'
import { markets } from '@/data/markets'
import { IG_LINKS } from '@/data/igLinks'
import type { Market } from '@/types'

const MarketInstrument: React.FC = () => {
  const { categorySlug, instrumentSlug } = useParams<{ categorySlug: string; instrumentSlug: string }>()
  const { data: liveMarkets, error } = useLiveMarkets()

  const bundled = markets.find((m) => m.slug === instrumentSlug)
  const live = liveMarkets?.find((m) => m.slug === instrumentSlug)

  // Merge bundled static metadata with live pricing for each related market.
  // The relationship graph comes from bundled data since the live API
  // doesn't expose relatedSlugs.
  const related = useMemo<Market[]>(() => {
    if (!bundled?.relatedSlugs || bundled.relatedSlugs.length === 0) return []
    return bundled.relatedSlugs
      .map((slug) => {
        const relatedBundled = markets.find((m) => m.slug === slug)
        if (!relatedBundled) return null
        const relatedLive = liveMarkets?.find((m) => m.slug === slug)
        return { ...relatedBundled, ...(relatedLive ?? {}) }
      })
      .filter((m): m is Market => m !== null)
  }, [bundled, liveMarkets])

  if (!bundled) {
    return <Navigate to={`/markets/${categorySlug}`} replace />
  }

  const market = { ...bundled, ...(live ?? {}) }

  return (
    <>
      <Section className="pb-8">
        <Container>
          <nav className="text-sm text-ink-700/60 mb-4" aria-label="Breadcrumb">
            <Link to="/markets" className="hover:text-ink-950">Markets</Link>
            <span className="mx-2">/</span>
            <Link to={`/markets/${categorySlug}`} className="hover:text-ink-950 capitalize">{categorySlug}</Link>
          </nav>

          {error && (
            <div className="mb-6">
              <ErrorState message={error} />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-display font-semibold">{market.name}</h1>
                <span className="text-sm font-mono text-ink-700/60">{market.symbol}</span>
              </div>
              <p className="mt-4 text-lg text-ink-700/80 leading-relaxed">{market.description}</p>

              {market.keyFacts && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-ink-950">Key facts</h2>
                  <ul className="mt-3 space-y-2">
                    {market.keyFacts.map((f) => (
                      <li key={f} className="flex gap-2 text-ink-700/90">
                        <span className="text-brand-500 font-semibold">&bull;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {market.tradingHours && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-ink-950">Trading hours</h2>
                  <p className="mt-2 text-ink-700/85">{market.tradingHours}</p>
                </div>
              )}

              <div className="mt-8">
                <RiskBanner />
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-ink-900/10 bg-white p-6 sticky top-24">
                <p className="text-xs text-ink-700/60 uppercase tracking-wide">
                  {live ? 'Live price' : 'Illustrative price'}
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="font-mono text-3xl font-semibold text-ink-950 tabular-nums">{market.price}</span>
                  <PriceChangeTag value={market.changePercent} />
                </div>
                <p className="mt-2 text-xs text-ink-700/60 leading-relaxed">
                  Prices shown for reference. Trading and execution are provided by IG Group.
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-700/70">Spread from</dt>
                    <dd className="font-semibold">{market.spreadFrom}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-700/70">Status</dt>
                    <dd className="font-semibold capitalize">{market.status}</dd>
                  </div>
                </dl>
                <a
                  href={IG_LINKS.openAccount}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center rounded-full bg-brand-500 text-white font-semibold py-3 hover:bg-brand-600 transition-colors"
                >
                  Trade {market.symbol} with IG
                </a>
                <a
                  href={IG_LINKS.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center rounded-full border border-ink-900/15 font-semibold py-3 hover:border-ink-900/30 transition-colors"
                >
                  Practise on IG&rsquo;s demo
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="brand-50">
          <Container>
            <h2 className="text-2xl font-semibold text-ink-950 mb-6">Related markets</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((m) => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <AccountCta />
        </Container>
      </Section>
    </>
  )
}

export default MarketInstrument