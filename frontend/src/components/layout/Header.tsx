import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { primaryNav } from '@/data/nav'
import NavDropdown from '@/components/navigation/NavDropdown'
import MobileNav from '@/components/navigation/MobileNav'
import { classNames } from '@/utils/format'

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-ink-900/10">
      <div className="container-page">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Tradevia home">
            <span className="font-display text-2xl font-bold tracking-tight text-ink-950">Tradevia</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavDropdown key={item.label} item={item} />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                classNames(
                  'px-4 py-2 text-sm font-semibold rounded-full border border-ink-900/15 hover:border-ink-900/30 transition-colors',
                  isActive && 'border-ink-900/40',
                )
              }
            >
              Log in
            </NavLink>
            <Link
              to="/open-account"
              className="px-4 py-2 text-sm font-semibold rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              Open an account
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink-900"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}

export default Header
