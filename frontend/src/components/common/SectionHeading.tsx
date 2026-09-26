interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={align === 'center' ? 'max-w-2xl mx-auto text-center' : 'max-w-2xl'}>
    {eyebrow && <p className="text-sm font-medium text-brand-600 mb-2">{eyebrow}</p>}
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
    {description && <p className="mt-4 text-base sm:text-lg text-ink-700/80 leading-relaxed">{description}</p>}
  </div>
)

export default SectionHeading
