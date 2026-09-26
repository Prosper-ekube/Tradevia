import { useState, useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import CategoryNav from '@/components/markets/CategoryNav'
import MarketTable from '@/components/markets/MarketTable'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import { useFetch } from '@/hooks/useFetch'
import { marketService } from '@/services/marketService'

const Markets: React.FC = () => {
  const [query, setQuery] = useState('')
  const { data, state, error } = useFetch(() => marketService.getMarkets(), [])

  const filtered = useMemo(() => {
    if (!data) return []
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((m) => m.name.toLowerCase().includes(q) || m.symbol.toLowerCase().includes(q))
  }, [data, query])

  return (
    <>
      <Section className="pb-8">
        <Container>
          <SectionHeading
            eyebrow="Markets"
            title="All markets"
            description="Search and browse the markets available to trade via spread betting and CFDs."
          />
          <div className="mt-8 space-y-5">
            <CategoryNav />
            <div className="relative max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markets, e.g. EUR/USD, Gold"
                className="w-full rounded-full border border-ink-900/15 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                aria-label="Search markets"
              />
            </div>
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          {state === 'loading' && <LoadingState label="Loading markets" rows={5} />}
          {state === 'error' && <ErrorState message={error ?? undefined} />}
          {state === 'success' && <MarketTable markets={filtered} />}
        </Container>
      </Section>
    </>
  )
}

export default Markets
