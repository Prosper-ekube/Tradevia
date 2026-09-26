import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '@/utils/format'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
  secondary: 'bg-white text-ink-900 border border-ink-900/15 hover:border-ink-900/30',
  ghost: 'text-ink-900 hover:bg-ink-900/5',
}

const sizeClasses: Record<Size, string> = {
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3.5',
}

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-offset-2 whitespace-nowrap'

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  to?: undefined
}

interface ButtonAsLink extends BaseProps {
  to: string
  children?: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonAsButton) {
  return (
    <button
      className={classNames(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
}

export function LinkButton({ variant = 'primary', size = 'md', className, to, children }: ButtonAsLink) {
  return (
    <Link to={to} className={classNames(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </Link>
  )
}
