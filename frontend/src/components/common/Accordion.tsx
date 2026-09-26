import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { classNames } from '@/utils/format'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border-b border-ink-900/10">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium text-ink-900">{question}</span>
        <FiChevronDown
          className={classNames('shrink-0 transition-transform text-ink-700', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && <p className="pb-4 text-ink-700/90 leading-relaxed">{answer}</p>}
    </div>
  )
}

export default AccordionItem
