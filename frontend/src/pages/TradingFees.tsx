import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import RiskBanner from '@/components/common/RiskBanner'

const feeRows = [
  { item: 'Spread', description: 'The difference between the buy and sell price, built into most trades. Varies by market and liquidity.' },
  { item: 'Overnight funding', description: 'A charge (or credit) applied to leveraged positions held open overnight, reflecting the cost of the notional exposure.' },
  { item: 'Commission (shares)', description: 'A separate commission may apply on share CFDs and share dealing, in addition to any spread.' },
  { item: 'Currency conversion', description: 'A conversion fee may apply when trading markets denominated in a different currency to your account.' },
  { item: 'Inactivity fee', description: 'Some account types may charge a fee after an extended period of account inactivity.' },
]

const TradingFees: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading
        eyebrow="IG trading · Charges & spreads"
        title="How IG's pricing works"
        description="Costs vary by product, market and account type. This page explains the types of charges you may encounter with IG — always check the specific market page on IG's site for current rates."
      />
      <div className="mt-10 rounded-2xl border border-ink-900/10 divide-y divide-ink-900/10 bg-white overflow-hidden">
        {feeRows.map((row) => (
          <div key={row.item} className="p-5 sm:p-6 grid sm:grid-cols-4 gap-2 sm:gap-6">
            <p className="font-semibold text-ink-950 sm:col-span-1">{row.item}</p>
            <p className="text-sm text-ink-700/80 leading-relaxed sm:col-span-3">{row.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <RiskBanner />
      </div>
    </Container>
  </Section>
)

export default TradingFees