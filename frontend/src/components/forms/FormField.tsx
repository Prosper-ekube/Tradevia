import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface BaseFieldProps {
  label: string
  name: string
  error?: string
}

type InputProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' }
type TextareaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' }

const fieldClasses =
  'w-full rounded-xl border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors'

export function FormField(props: InputProps | TextareaProps) {
  const { label, name, error } = props

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-900 mb-1.5">
        {label}
      </label>
      {props.as === 'textarea' ? (
        <textarea id={name} className={fieldClasses} rows={5} {...(props as TextareaProps)} />
      ) : (
        <input id={name} className={fieldClasses} {...(props as InputProps)} />
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-signal-down">
          {error}
        </p>
      )}
    </div>
  )
}
