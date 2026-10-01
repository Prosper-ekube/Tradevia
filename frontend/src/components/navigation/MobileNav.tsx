import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import type { NavItem } from '@/types'
import { primaryNav } from '@/data/nav'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/hooks/useLogout'
import { classNames } from '@/utils/format'

const MobileNavGroup: React.FC<{ item: NavItem; onNavigate: () => void }> = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <Link
        to={item.to ?? '#'}
        onClick={onNavigate}
        className="block py-3 text-base font-semibold text-ink-900 border-b border-ink-900/10"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-ink-900/10">
      <button
        className="w-full flex items-center justify-between py-3 text-base font-semibold text-ink-900"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.label}
        <FiChevronDown className={classNames('transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div className="pb-3 pl-2 space-y-1">
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

const MobileNav: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  useLockBodyScroll(open)
  const { isAuthenticated, user } = useAuth()
  const logout = useLogout()

  if (!open) return null

  async function handleLogout() {
    await logout()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-ink-950/40" onClick={onClose} aria-hidden />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.25 }}
        className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-ink-900/10">
          <span className="font-display text-xl font-semibold">IG</span>
          <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2">
            <FiX size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {primaryNav.map((item) => (
            <MobileNavGroup key={item.label} item={item} onNavigate={onClose} />
          ))}
        </nav>
        <div className="p-4 border-t border-ink-900/10 flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <p className="text-center text-sm text-ink-700/80">
                Signed in as {user?.first_name || user?.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-center rounded-full border border-ink-900/15 py-2.5 font-semibold text-sm"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="w-full text-center rounded-full border border-ink-900/15 py-2.5 font-semibold text-sm"
              >
                Log in
              </Link>
              <Link
                to="/open-account"
                onClick={onClose}
                className="w-full text-center rounded-full bg-brand-500 text-white py-2.5 font-semibold text-sm"
              >
                Open an account
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default MobileNav