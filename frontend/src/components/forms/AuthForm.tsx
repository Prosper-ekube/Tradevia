import { useState, type FormEvent } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/common/Button'
import type { RequestState } from '@/types'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (values: { fullName?: string; email: string; password: string }) => Promise<void>
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<RequestState>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setState('loading')
    try {
      await onSubmit({ fullName: mode === 'register' ? fullName : undefined, email, password })
      setState('success')
    } catch {
      // This is a demo marketing site with no live auth backend by default,
      // so we treat the attempt as informational rather than a hard failure.
      setState('error')
      setError(
        'This is a demo marketing site — there is no live account system connected yet. In production this would authenticate against the backend.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === 'register' && (
        <FormField
          label="Full name"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      )}
      <FormField
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        required
      />
      {error && (
        <p role="status" className="text-sm text-ink-700 bg-ink-900/5 rounded-xl p-3">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={state === 'loading'}>
        {state === 'loading' ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
      </Button>
    </form>
  )
}
