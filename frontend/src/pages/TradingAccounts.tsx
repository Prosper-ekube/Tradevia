import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import AccountTypeCard from '@/components/trading/AccountTypeCard'
import RiskBanner from '@/components/common/RiskBanner'

const accountTypes = [
  {
    name: 'CFD trading account',
    tagline: 'Trade thousands of markets on leverage, long or short.',
    points: ['Available in most regions', 'Losses may offset gains for tax purposes in some jurisdictions', 'Access to forex, indices, shares, commodities and crypto'],
  },
  {
    name: 'Spread betting account',
    tagline: 'Speculate on price movements with a bet per point.',
    highlighted: true,
    points: ['UK and Ireland residents only', 'Tax-free profits, subject to individual circumstances', 'No stamp duty on UK shares'],
  },
  {
    name: 'Share dealing account',
    tagline: 'Buy and own shares outright, without leverage.',
    points: ['Own the underlying shares', 'Eligible for ISAs in the UK, where applicable', 'Access to a wide range of global exchanges'],
  },
]

const TradingAccounts: React.FC = () => (
  <>
    <Section className="pb-8">
      <Container>
        <SectionHeading
          eyebrow="Trading &middot; Accounts"
          title="Choose the account that fits how you trade"
          description="Account availability varies by country of residence and local regulation."
        />
      </Container>
    </Section>
    <Section className="pt-0">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {accountTypes.map((a) => (
            <AccountTypeCard key={a.name} {...a} />
          ))}
        </div>
        <div className="mt-8">
          <RiskBanner />
        </div>
      </Container>
    </Section>
  </>
)

export default TradingAccounts
