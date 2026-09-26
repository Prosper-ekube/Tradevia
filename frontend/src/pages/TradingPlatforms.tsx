import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import PlatformCard from '@/components/trading/PlatformCard'
import AccountCta from '@/components/account/AccountCta'

const platforms = [
  {
    name: 'Web platform',
    description: 'Our browser-based platform, with no download required, designed for both quick trades and in-depth analysis.',
    points: ['Advanced, customisable charting', 'Real-time price and news alerts', 'Watchlists and market screeners', 'Works on any modern browser'],
  },
  {
    name: 'Mobile app',
    description: 'Trade on the move with a full-featured app available for iOS and Android.',
    points: ['Biometric login', 'Push notifications for price alerts', 'One-swipe deal ticket', 'Sync watchlists across devices'],
  },
  {
    name: 'Desktop platform',
    description: 'A dedicated desktop application for traders who want multiple charts and deeper analysis tools on-screen at once.',
    points: ['Multi-chart workspaces', 'Advanced order types', 'Custom layouts and shortcuts'],
  },
  {
    name: 'Third-party & API access',
    description: 'Connect supported third-party charting and execution platforms, or build your own tools via API.',
    points: ['REST and streaming APIs', 'Algorithmic trading support', 'Integration with popular charting tools'],
  },
]

const TradingPlatforms: React.FC = () => (
  <>
    <Section className="pb-8">
      <Container>
        <SectionHeading
          eyebrow="Trading &middot; Platforms"
          title="Platforms for every kind of trader"
          description="Whether you trade from your desk or on the move, our platforms are built to keep up."
        />
      </Container>
    </Section>
    <Section className="pt-0">
      <Container>
        <div className="grid sm:grid-cols-2 gap-5">
          {platforms.map((p) => (
            <PlatformCard key={p.name} {...p} />
          ))}
        </div>
      </Container>
    </Section>
    <Section tone="brand-50">
      <Container>
        <AccountCta />
      </Container>
    </Section>
  </>
)

export default TradingPlatforms
