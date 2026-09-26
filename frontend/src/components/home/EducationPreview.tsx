import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import ArticleCard from '@/components/education/ArticleCard'
import { LinkButton } from '@/components/common/Button'
import { articles } from '@/data/education'

const EducationPreview: React.FC = () => (
  <Section tone="brand-50">
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Education" title="Learn before you trade" />
        <LinkButton to="/education" variant="secondary">
          Browse all articles
        </LinkButton>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </Container>
  </Section>
)

export default EducationPreview
