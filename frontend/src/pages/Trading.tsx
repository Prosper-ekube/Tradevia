import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import AccountCta from '@/components/account/AccountCta'

const links = [
  { to: '/trading/platforms', title: 'Platforms', description: "IG's web, desktop and mobile trading platforms." },
  { to: '/trading/accounts', title: 'Account types', description: "IG's CFD, spread betting and share dealing accounts." },
  { to: '/trading/fees', title: 'Charges & spreads', description: "How IG's trading costs work across markets." },
  { to: '/trading/conditions', title: 'Trading conditions', description: "IG's leverage, execution and market hours." },
  { to: '/trading/tools', title: 'Tools & features', description: "IG's charting, alerts and risk-management tools." },
]

const Trading: React.FC = () => (
  <>
    <Section className="pb-8">
      <Container>
        <SectionHeading
          eyebrow="IG trading"
          title="Everything you need to trade with IG"
          description="Explore IG's platforms, account types, costs and the tools built to support your trading. Tradevia is an independent guide — accounts and trading are provided by IG Group."
        />
      </Container>
    </Section>
    <Section className="pt-0">
      <Container>
        <div className="grid sm:grid-cols-2 gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-500/40 hover:shadow-panel transition-all"
            >
              <div>
                <h3 className="font-semibold text-ink-950">{l.title}</h3>
                <p className="mt-1 text-sm text-ink-700/75">{l.description}</p>
              </div>
              <FiArrowRight className="text-ink-700/40 group-hover:text-brand-600 transition-colors shrink-0 ml-4" />
            </Link>
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

export default Trading