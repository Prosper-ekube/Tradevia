import SectionHeading from '@/components/common/SectionHeading'
import CategoryCard from '@/components/markets/CategoryCard'
import { marketCategories } from '@/data/markets'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'

const MarketOverview: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading
        eyebrow="Markets"
        title="Thousands of markets, one platform"
        description="From major currency pairs to niche commodities, access the instruments you want to trade in one place."
      />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {marketCategories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </Container>
  </Section>
)

export default MarketOverview
