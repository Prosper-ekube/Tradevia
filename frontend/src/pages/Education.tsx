import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import ArticleCard from '@/components/education/ArticleCard'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import { useFetch } from '@/hooks/useFetch'
import { articleService } from '@/services/articleService'
import { classNames } from '@/utils/format'

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

const Education: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const [level, setLevel] = useState(params.get('level') || 'All')
  const { data, state, error } = useFetch(() => articleService.getArticles(), [])

  const filtered = useMemo(() => {
    if (!data) return []
    return level === 'All' ? data : data.filter((a) => a.level === level)
  }, [data, level])

  function handleLevel(l: string) {
    setLevel(l)
    const next = new URLSearchParams(params)
    if (l === 'All') next.delete('level')
    else next.set('level', l)
    setParams(next, { replace: true })
  }

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="IG education"
          title="Trading education, from first trade to advanced strategy"
          description="Free guides and articles from IG covering the fundamentals, risk management and trading strategy. Tradevia hosts these resources as an independent guide — trading is provided by IG Group."
        />
        <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => handleLevel(l)}
              className={classNames(
                'shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
                level === l ? 'bg-ink-950 text-white border-ink-950' : 'border-ink-900/15 text-ink-900 hover:border-ink-900/30',
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {state === 'loading' && <LoadingState label="Loading articles" />}
          {state === 'error' && <ErrorState message={error ?? undefined} />}
          {state === 'success' && filtered.length === 0 && (
            <EmptyState title="No articles found" description="Try a different level or check back soon." />
          )}
          {state === 'success' && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

export default Education