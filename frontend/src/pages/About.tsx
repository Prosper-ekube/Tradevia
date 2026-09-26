import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import StatStrip from '@/components/trading/StatStrip'
import AccountCta from '@/components/account/AccountCta'

const stats = [
  { label: 'Founded', value: '1974' },
  { label: 'Listed on', value: 'London Stock Exchange (IGG)' },
  { label: 'Regulator (UK)', value: 'FCA' },
  { label: 'Countries with operations', value: '20+' },
]

const timeline = [
  { year: '1974', text: 'Founded in London as IG Index, the world\u2019s first financial spread betting company, allowing clients to trade the price of gold without owning it.' },
  { year: '1996', text: 'Launched foreign exchange trading, expanding beyond the original commodity and index offering.' },
  { year: '2000', text: 'IG Group formed as the parent company and began trading on the London Stock Exchange.' },
  { year: '2002', text: 'Expanded internationally for the first time, entering the Australian market.' },
  { year: '2021', text: 'Acquired Chicago-based online brokerage tastytrade, broadening its offering for US retail investors.' },
]

const About: React.FC = () => (
  <>
    <Section className="pb-8">
      <Container>
        <SectionHeading
          eyebrow="Company"
          title="About IG"
          description="A global provider of online trading, with a history stretching back to 1974."
        />
      </Container>
    </Section>
    <Section className="pt-0">
      <Container>
        <StatStrip stats={stats} />
      </Container>
    </Section>
    <Section tone="brand-50">
      <Container>
        <h2 className="text-2xl font-semibold text-ink-950 mb-8">Our history</h2>
        <div className="space-y-6">
          {timeline.map((t) => (
            <div key={t.year} className="flex gap-6">
              <span className="w-16 shrink-0 font-mono text-brand-600 font-semibold">{t.year}</span>
              <p className="text-ink-700/85 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-700/50 max-w-2xl leading-relaxed">
          Historical details are drawn from publicly available sources about IG Group and are provided
          for context. This page is part of an independent concept project and is not an official IG
          publication.
        </p>
      </Container>
    </Section>
    <Section>
      <Container>
        <AccountCta />
      </Container>
    </Section>
  </>
)

export default About
