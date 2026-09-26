import { FiActivity, FiBell, FiShield, FiPieChart, FiTarget, FiBookOpen } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import FeatureGrid from '@/components/trading/FeatureGrid'

const tools = [
  { icon: FiActivity, title: 'Advanced charting', description: 'Dozens of indicators and drawing tools across multiple timeframes.' },
  { icon: FiBell, title: 'Price alerts', description: 'Set alerts on price, news and technical levels, delivered to your device.' },
  { icon: FiShield, title: 'Risk management', description: 'Stop-losses, limits and guaranteed stops (where available) to help manage downside.' },
  { icon: FiPieChart, title: 'Portfolio overview', description: 'A consolidated view of your open positions and account performance.' },
  { icon: FiTarget, title: 'Economic calendar', description: 'Track upcoming data releases and events that can move markets.' },
  { icon: FiBookOpen, title: 'Market news & analysis', description: 'In-platform news and analysis to help inform your trading decisions.' },
]

const TradingTools: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading eyebrow="Trading &middot; Tools" title="Tools that support every stage of a trade" />
      <div className="mt-10">
        <FeatureGrid features={tools} />
      </div>
    </Container>
  </Section>
)

export default TradingTools
