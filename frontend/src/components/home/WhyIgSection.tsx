import { FiShield, FiBarChart2, FiHeadphones, FiGlobe, FiTrendingUp, FiSmartphone } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import FeatureGrid from '@/components/trading/FeatureGrid'

const features = [
  {
    icon: FiShield,
    title: 'Trusted and regulated',
    description: 'IG Group is regulated by multiple financial authorities worldwide, including the FCA in the UK.',
  },
  {
    icon: FiBarChart2,
    title: 'Deep market access',
    description: 'Access thousands of markets through IG — forex, indices, shares, commodities and crypto.',
  },
  {
    icon: FiHeadphones,
    title: '24-hour support',
    description: "IG's support teams are available when you need them, including during your trading hours.",
  },
  {
    icon: FiGlobe,
    title: 'Global presence',
    description: 'IG operates across Europe, Asia-Pacific, the Middle East and North America.',
  },
  {
    icon: FiTrendingUp,
    title: 'Established since 1974',
    description: 'IG Group has decades of experience, having pioneered financial spread betting in the UK.',
  },
  {
    icon: FiSmartphone,
    title: 'Trade anywhere',
    description: "IG's award-recognised web, desktop and mobile platforms are built for active trading.",
  },
]

const WhyIgSection: React.FC = () => (
  <Section tone="brand-50">
    <Container>
      <SectionHeading eyebrow="Why IG" title="Built for traders who take it seriously" align="left" />
      <div className="mt-10">
        <FeatureGrid features={features} />
      </div>
    </Container>
  </Section>
)

export default WhyIgSection