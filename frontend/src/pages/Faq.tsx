import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import AccordionItem from '@/components/common/Accordion'
import { faqCategories } from '@/data/faq'

const Faq: React.FC = () => (
  <Section>
    <Container>
      <SectionHeading eyebrow="Support" title="Frequently asked questions" />
      <div className="mt-10 grid lg:grid-cols-2 gap-x-12 gap-y-10">
        {faqCategories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-lg font-semibold text-ink-950 mb-2">{cat.title}</h2>
            <div>
              {cat.items.map((item) => (
                <AccordionItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </Section>
)

export default Faq
