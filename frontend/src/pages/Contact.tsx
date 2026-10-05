import { FiMapPin, FiPhone, FiExternalLink } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import { ContactForm } from '@/components/forms/ContactForm'
import { IG_LINKS } from '@/data/igLinks'

const igDetails = [
  {
    icon: FiMapPin,
    label: 'IG Group head office',
    value: 'Cannon Bridge House, 25 Dowgate Hill, London EC4R 2YA, UK',
  },
  {
    icon: FiPhone,
    label: 'IG Group client support',
    value: '+44 (0)20 7896 0011',
  },
]

const Contact: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading
        eyebrow="Company"
        title="Contact Tradevia"
        description="Have a question about Tradevia, feedback on our content, or a correction? Send us a message. For account, trading or platform queries, please contact IG Group directly."
      />
      <div className="mt-12 grid lg:grid-cols-2 gap-10">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">
              IG Group contact details
            </h3>
            <p className="text-xs text-ink-700/70 leading-relaxed mb-4">
              Tradevia is an independent marketing site and cannot answer account or trading queries.
              For anything related to your IG account, please contact IG Group directly.
            </p>
            <div className="space-y-4">
              {igDetails.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center gap-2 text-brand-600">
                    <d.icon />
                    <span className="text-xs font-semibold uppercase tracking-wide">{d.label}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-800">{d.value}</p>
                </div>
              ))}
              <a
                href={IG_LINKS.openAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Visit IG&rsquo;s official site
                <FiExternalLink size={14} />
              </a>
            </div>
          </div>

          <p className="text-xs text-ink-700/50 leading-relaxed">
            The address and phone number shown are IG Group&rsquo;s, provided for reference only.
            Tradevia has no offices and does not provide brokerage services.
          </p>
        </div>
      </div>
    </Container>
  </Section>
)

export default Contact