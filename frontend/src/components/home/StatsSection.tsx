import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import StatStrip from '@/components/trading/StatStrip'

const stats = [
  { label: 'Founded', value: '1974' },
  { label: 'Listed on', value: 'LSE: IGG' },
  { label: 'Countries with operations', value: '20+' },
  { label: 'Markets to trade', value: '17,000+' },
]

const StatsSection: React.FC = () => (
  <Section tone="ink">
    <Container>
      <StatStrip stats={stats} light />
    </Container>
  </Section>
)

export default StatsSection
