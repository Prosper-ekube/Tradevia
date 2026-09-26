import { useParams, Navigate, Link } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import CategoryNav from '@/components/markets/CategoryNav'
import MarketTable from '@/components/markets/MarketTable'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import AccountCta from '@/components/account/AccountCta'
import { useFetch } from '@/hooks/useFetch'
import { marketService } from '@/services/marketService'
import { getCategoryBySlug } from '@/data/markets'

const MarketCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined
  const { data, state, error } = useFetch(() => marketService.getMarkets(categorySlug), [categorySlug])

  if (!category) return <Navigate to="/markets" replace />

  return (
    <>
      <Section className="pb-8">
        <Container>
          <nav className="text-sm text-ink-700/60 mb-4" aria-label="Breadcrumb">
            <Link to="/markets" className="hover:text-ink-950">Markets</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-900">{category.name}</span>
          </nav>
          <SectionHeading eyebrow="Markets" title={category.name} description={category.description} />
          <div className="mt-8">
            <CategoryNav />
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          {state === 'loading' && <LoadingState label={`Loading ${category.name} markets`} rows={5} />}
          {state === 'error' && <ErrorState message={error ?? undefined} />}
          {state === 'success' && <MarketTable markets={data ?? []} />}
        </Container>
      </Section>
      <Section tone="brand-50">
        <Container>
          <AccountCta />
        </Container>
      </Section>
    </>
  )
}

export default MarketCategoryPage
