import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import type { NavItem } from '@/types'
import { classNames } from '@/utils/format'

const NavDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  if (!item.children) {
    return (
      <Link
        to={item.to ?? '#'}
        className="px-3 py-2 text-sm font-medium text-ink-900/80 hover:text-ink-950 transition-colors"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-900/80 hover:text-ink-950 transition-colors"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <FiChevronDown className={classNames('transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      <div
        className={classNames(
          'absolute left-0 top-full pt-2 w-72 transition-all',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none',
        )}
      >
        <div className="rounded-2xl border border-ink-900/10 bg-white shadow-panel p-2">
          {item.children.map((child) => (
            <Link
              key={child.to}
              to={child.to}
              className="block rounded-xl px-3 py-2.5 hover:bg-ink-900/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="block text-sm font-semibold text-ink-900">{child.label}</span>
              {child.description && (
                <span className="block text-xs text-ink-700/70 mt-0.5">{child.description}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavDropdown
