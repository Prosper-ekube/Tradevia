import type { ReactNode } from 'react'
import { classNames } from '@/utils/format'

interface SectionProps {
  children: ReactNode
  className?: string
  tone?: 'paper' | 'ink' | 'brand-50'
  id?: string
}

const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  paper: 'bg-paper',
  ink: 'bg-ink-950 text-white',
  'brand-50': 'bg-brand-50',
}

const Section: React.FC<SectionProps> = ({ children, className, tone = 'paper', id }) => (
  <section id={id} className={classNames('py-14 sm:py-20', toneClasses[tone], className)}>
    {children}
  </section>
)

export default Section
