import { useParams, Navigate, Link } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import PriceChangeTag from '@/components/markets/PriceChangeTag'
import MarketCard from '@/components/markets/MarketCard'
import AccountCta from '@/components/account/AccountCta'
import RiskBanner from '@/components/common/RiskBanner'
import { useFetch } from '@/hooks/useFetch'
import { marketService } from '@/services/marketService'
import { markets } from '@/data/markets'

const MarketInstrument: React.FC = () => {
  const { categorySlug, instrumentSlug } = useParams<{ categorySlug: string; instrumentSlug: string }>()
  const { data: market, state, error } = useFetch(
    () => marketService.getMarketBySlug(instrumentSlug ?? ''),
    [instrumentSlug],
  )

  if (state === 'success' && !market) {
    return <Navigate to={`/markets/${categorySlug}`} replace />
  }

  const related = market
    ? markets.filter((m) => market.relatedSlugs?.includes(m.slug))
    : []

  return (
    <>
      <Section className="pb-8">
        <Container>
          <nav className="text-sm text-ink-700/60 mb-4" aria-label="Breadcrumb">
            <Link to="/markets" className="hover:text-ink-950">Markets</Link>
            <span className="mx-2">/</span>
            <Link to={`/markets/${categorySlug}`} className="hover:text-ink-950 capitalize">{categorySlug}</Link>
          </nav>

          {state === 'loading' && <LoadingState label="Loading market" />}
          {state === 'error' && <ErrorState message={error ?? undefined} />}

          {market && (
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
                  <p className="text-xs text-ink-700/60 uppercase tracking-wide">Illustrative price</p>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="font-mono text-3xl font-semibold text-ink-950 tabular-nums">{market.price}</span>
                    <PriceChangeTag value={market.changePercent} />
                  </div>
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
                  <Link
                    to="/open-account"
                    className="mt-6 block text-center rounded-full bg-brand-500 text-white font-semibold py-3 hover:bg-brand-600 transition-colors"
                  >
                    Trade {market.symbol}
                  </Link>
                  <Link
                    to="/demo-account"
                    className="mt-3 block text-center rounded-full border border-ink-900/15 font-semibold py-3 hover:border-ink-900/30 transition-colors"
                  >
                    Practise on demo
                  </Link>
                </div>
              </aside>
            </div>
          )}
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
