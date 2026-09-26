import { useParams, Link, Navigate } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import LevelBadge from '@/components/education/LevelBadge'
import ArticleCard from '@/components/education/ArticleCard'
import { useFetch } from '@/hooks/useFetch'
import { articleService } from '@/services/articleService'
import { articles } from '@/data/education'

const EducationArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, state, error } = useFetch(() => articleService.getArticleBySlug(slug ?? ''), [slug])

  if (state === 'success' && !article) {
    return <Navigate to="/education" replace />
  }

  const related = article
    ? articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3)
    : []

  return (
    <>
      <Section className="pb-8">
        <Container>
          <nav className="text-sm text-ink-700/60 mb-6" aria-label="Breadcrumb">
            <Link to="/education" className="hover:text-ink-950">Education</Link>
          </nav>

          {state === 'loading' && <LoadingState label="Loading article" />}
          {state === 'error' && <ErrorState message={error ?? undefined} />}

          {article && (
            <article className="max-w-2xl">
              <div className="flex items-center gap-2">
                <LevelBadge level={article.level} />
                <span className="text-xs text-ink-700/60">{article.category}</span>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-display font-semibold leading-tight">
                {article.title}
              </h1>
              <p className="mt-3 text-sm text-ink-700/60">
                {article.author} &middot; {article.readingMinutes} min read
              </p>
              <div className="mt-8 space-y-5">
                {article.content.map((para, i) => (
                  <p key={i} className="text-ink-800 leading-relaxed">{para}</p>
                ))}
              </div>
            </article>
          )}
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="brand-50">
          <Container>
            <h2 className="text-2xl font-semibold text-ink-950 mb-6">More in {article?.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}

export default EducationArticle
