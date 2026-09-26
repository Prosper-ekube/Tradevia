import { useState } from 'react'

import { Link } from 'react-router-dom'

import { FiChevronDown, FiX } from 'react-icons/fi'

import { motion } from 'framer-motion'

import type { NavItem } from '@/types'

import { primaryNav } from '@/data/nav'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import { classNames } from '@/utils/format'

const MobileNavGroup: React.FC<{ item: NavItem; onNavigate: () => void }> = ({
  item,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <Link
        to={item.to ?? '#'}
        onClick={onNavigate}
        className="block border-b border-ink-900/10 py-3 text-base font-semibold text-ink-900"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-ink-900/10">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-base font-semibold text-ink-900"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="min-w-0">{item.label}</span>

        <FiChevronDown
          className={classNames(
            'shrink-0 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-1 pb-3 pl-2">
          {item.children.map((child) => (
            <Link
              key={child.to}
              to={child.to}
              onClick={onNavigate}
              className="block py-2 text-sm text-ink-700 hover:text-ink-950"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const MobileNav: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  useLockBodyScroll(open)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-ink-950/40"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.25 }}
        className="fixed inset-0 z-10 flex h-screen w-full flex-col overflow-hidden bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink-900/10 bg-white px-4 py-4">
          <span className="font-display text-xl font-semibold text-ink-900">
            Tradevia
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 p-2 text-ink-900"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto bg-white px-4 py-2">
          {primaryNav.map((item) => (
            <MobileNavGroup
              key={item.label}
              item={item}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-ink-900/10 bg-white p-4">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full rounded-full border border-ink-900/15 py-2.5 text-center text-sm font-semibold text-ink-900"
          >
            Log in
          </Link>

          <Link
            to="/open-account"
            onClick={onClose}
            className="w-full rounded-full bg-brand-500 py-2.5 text-center text-sm font-semibold text-white"
          >
            Open an account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default MobileNav