import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import RiskBanner from '@/components/common/RiskBanner'

const items = [
  { title: 'Leverage', body: "Leverage lets you gain full market exposure for a fraction of the notional value, known as margin. IG's maximum leverage varies by market, product and your regulatory jurisdiction." },
  { title: 'Execution', body: "IG executes orders against quoted prices, which may move between the moment you place an order and the moment it is filled, particularly in fast-moving markets." },
  { title: 'Market hours', body: 'Some markets, like major forex pairs, trade nearly 24 hours a day. Others, like individual shares, generally follow the hours of their home exchange, with extended hours available on selected markets.' },
  { title: 'Order types', body: "IG offers standard, limit, stop and guaranteed stop orders (where available), letting you manage entries, exits and risk in different ways." },
  { title: 'Margin calls', body: "If your IG account funds fall below the required margin level, IG may ask you to add funds or close positions automatically to manage risk." },
]

const TradingConditions: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading
        eyebrow="IG trading · Conditions"
        title="How trading with IG works"
        description="These are the key mechanics that apply when you trade with IG. Tradevia is an independent guide — trading is provided by IG Group."
      />
      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="font-semibold text-ink-950">{i.title}</h3>
            <p className="mt-2 text-sm text-ink-700/80 leading-relaxed">{i.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <RiskBanner />
      </div>
    </Container>
  </Section>
)

export default TradingConditions