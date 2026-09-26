import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import { ContactForm } from '@/components/forms/ContactForm'

const details = [
  { icon: FiMapPin, label: 'Head office', value: 'Cannon Bridge House, 25 Dowgate Hill, London EC4R 2YA, UK' },
  { icon: FiPhone, label: 'Client support', value: '+44 (0)20 7896 0011' },
  { icon: FiMail, label: 'Email', value: 'tradevia@gmail.com' },
]

const Contact: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading
        eyebrow="Company"
        title="Contact us"
        description="Have a question about your account, a trade or getting started? Send us a message and we'll get back to you."
      />
      <div className="mt-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-5">
          {details.map((d) => (
            <div key={d.label} className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <div className="flex items-center gap-2 text-brand-600">
                <d.icon />
                <span className="text-xs font-semibold uppercase tracking-wide">{d.label}</span>
              </div>
              <p className="mt-2 text-sm text-ink-800">{d.value}</p>
            </div>
          ))}          
        </div>
      </div>
    </Container>
  </Section>
)

export default Contact
