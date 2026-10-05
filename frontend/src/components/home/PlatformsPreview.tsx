import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import PlatformCard from '@/components/trading/PlatformCard'
import { LinkButton } from '@/components/common/Button'

const platforms = [
  {
    name: 'Web platform',
    description: "IG's browser-based platform, with advanced charting and no installation required.",
    points: ['Customisable layouts', 'Advanced charting package', 'Real-time price alerts'],
  },
  {
    name: 'Mobile app',
    description: "IG's full-featured mobile app for iOS and Android.",
    points: ['Biometric login', 'Push price alerts', 'Trade on the move'],
  },
  {
    name: 'Third-party platforms',
    description: 'Connect supported third-party platforms for advanced algorithmic and automated trading through IG.',
    points: ['API access', 'Automated strategies', 'Advanced order types'],
  },
]

const PlatformsPreview: React.FC = () => (
  <Section>
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="IG platforms" title="Platforms built for how you trade" />
        <LinkButton to="/trading/platforms" variant="secondary">
          Explore IG&rsquo;s platforms
        </LinkButton>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((p) => (
          <PlatformCard key={p.name} {...p} />
        ))}
      </div>
    </Container>
  </Section>
)

export default PlatformsPreview