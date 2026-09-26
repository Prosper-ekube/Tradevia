import { useState, type FormEvent } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/common/Button'
import { contactService } from '@/services/contactService'
import type { ContactPayload, RequestState } from '@/types'

const categories = ['General enquiry', 'Account opening', 'Existing account', 'Platform support', 'Complaint']

const initialForm: ContactPayload = {
  name: '',
  email: '',
  subject: '',
  message: '',
  category: categories[0],
}

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({})
  const [state, setState] = useState<RequestState>('idle')

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof ContactPayload, string>> = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Please enter a subject.'
    if (form.message.trim().length < 10) next.message = 'Please provide a few more details (at least 10 characters).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setState('loading')
    try {
      await contactService.submit(form)
      setState('success')
      setForm(initialForm)
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="max-w-xl rounded-2xl border border-signal-up/30 bg-signal-up/5 p-6">
        <h3 className="font-semibold text-ink-950">Message sent</h3>
        <p className="mt-1.5 text-sm text-ink-700/80">
          Thanks for reaching out &mdash; a member of the team will get back to you shortly.
        </p>
        <Button className="mt-4" variant="secondary" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-ink-900 mb-1.5">
          What&rsquo;s this about?
        </label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Full name"
          name="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={(e) => update('subject', e.target.value)}
        error={errors.subject}
      />

      <FormField
        as="textarea"
        label="Message"
        name="message"
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        error={errors.message}
      />

      {state === 'error' && (
        <p role="alert" className="text-sm text-signal-down">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === 'loading'}>
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}