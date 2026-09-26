import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import { AuthForm } from '@/components/forms/AuthForm'
import { authService } from '@/services/authService'
import RiskBanner from '@/components/common/RiskBanner'

const steps = [
  'Tell us a few personal details',
  'Verify your identity',
  'Fund your account',
  'Start trading',
]

const OpenAccount: React.FC = () => (
  <Section>
    <Container>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">
            Open a live trading account
          </h1>
          <p className="mt-4 text-ink-700/80 leading-relaxed">
            Get access to thousands of markets across forex, indices, shares, commodities and crypto.
            Account opening usually takes a few minutes, though identity verification may take longer.
          </p>
          <ul className="mt-8 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-ink-800">{s}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <RiskBanner />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink-950">Get started</h2>
          <p className="mt-1 text-sm text-ink-700/70">Create your account details to begin.</p>
          <div className="mt-6">
            <AuthForm
              mode="register"
              onSubmit={async ({ fullName, email, password }) => {
                await authService.register({ fullName: fullName ?? '', email, password })
              }}
            />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink-700/60">
            <FiCheck className="text-signal-up" />
            No obligation &mdash; you can also try a free demo account first.
          </div>
          <p className="mt-4 text-center text-sm">
            <Link to="/demo-account" className="font-semibold text-brand-600 hover:text-brand-700">
              Try a demo account instead
            </Link>
          </p>
        </div>
      </div>
    </Container>
  </Section>
)

export default OpenAccount
