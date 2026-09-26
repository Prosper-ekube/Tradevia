import { FiShield, FiBarChart2, FiHeadphones, FiGlobe, FiTrendingUp, FiSmartphone } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import FeatureGrid from '@/components/trading/FeatureGrid'
import AccountCta from '@/components/account/AccountCta'

const features = [
  { icon: FiShield, title: 'Regulated and trusted', description: 'Regulated by multiple financial authorities across the regions we operate in.' },
  { icon: FiBarChart2, title: 'Breadth of markets', description: 'Thousands of instruments across forex, indices, shares, commodities and crypto.' },
  { icon: FiHeadphones, title: 'Client support', description: 'Support teams available to help when you need them.' },
  { icon: FiGlobe, title: 'Global reach', description: 'A presence across Europe, Asia-Pacific, the Middle East and North America.' },
  { icon: FiTrendingUp, title: 'Decades of experience', description: 'Trading since 1974, with a track record through many market cycles.' },
  { icon: FiSmartphone, title: 'Platform choice', description: 'Web, mobile, desktop and third-party platform options.' },
]

const WhyIg: React.FC = () => (
  <>
    <Section className="pb-8">
      <Container>
        <SectionHeading eyebrow="Company" title="Why choose IG" description="What sets us apart as a trading provider." />
      </Container>
    </Section>
    <Section className="pt-0">
      <Container>
        <FeatureGrid features={features} />
      </Container>
    </Section>
    <Section tone="brand-50">
      <Container>
        <AccountCta />
      </Container>
    </Section>
  </>
)

export default WhyIg
