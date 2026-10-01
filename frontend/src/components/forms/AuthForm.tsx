import { useState, type FormEvent } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/common/Button'
import { ApiError } from '@/services/api'
import type { AuthResponse, RequestState } from '@/types'

interface AuthFormValues {
  fullName?: string
  email: string
  password: string
}

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (values: AuthFormValues) => Promise<AuthResponse>
  onSuccess?: (result: AuthResponse) => void
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export function AuthForm({ mode, onSubmit, onSuccess }: AuthFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<RequestState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (mode === 'register' && !fullName.trim()) next.fullName = 'Please enter your name.'
    if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Please enter a valid email address.'
    if (!password) next.password = 'Please enter a password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setGeneralError(null)
    if (!validate()) return

    setState('loading')
    try {
      const result = await onSubmit({
        fullName: mode === 'register' ? fullName.trim() : undefined,
        email: email.trim(),
        password,
      })
      setState('success')
      onSuccess?.(result)
    } catch (err) {
      setState('error')
      if (err instanceof ApiError && err.fieldErrors) {
        const next: Record<string, string> = {}
        for (const [field, messages] of Object.entries(err.fieldErrors)) {
          if (messages.length > 0) next[field] = messages[0]
        }
        setErrors(next)
      } else if (err instanceof ApiError) {
        setGeneralError(err.message)
      } else {
        setGeneralError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {mode === 'register' && (
        <FormField
          label="Full name"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          autoComplete="name"
          required
        />
      )}
      <FormField
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        required
      />
      {generalError && (
        <p role="alert" className="text-sm text-ink-700 bg-ink-900/5 rounded-xl p-3">
          {generalError}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={state === 'loading'}>
        {state === 'loading' ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
      </Button>
    </form>
  )
}