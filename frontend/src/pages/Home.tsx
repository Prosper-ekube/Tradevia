import Hero from '@/components/hero/Hero'
import StatsSection from '@/components/home/StatsSection'
import MarketOverview from '@/components/home/MarketOverview'
import WhyIgSection from '@/components/home/WhyIgSection'
import PlatformsPreview from '@/components/home/PlatformsPreview'
import EducationPreview from '@/components/home/EducationPreview'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import AccountCta from '@/components/account/AccountCta'

const Home: React.FC = () => (
  <>
    <Hero />
    <StatsSection />
    <MarketOverview />
    <WhyIgSection />
    <PlatformsPreview />
    <EducationPreview />
    <Section>
      <Container>
        <AccountCta />
      </Container>
    </Section>
  </>
)

export default Home
