import { Link, useNavigate } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import { AuthForm } from '@/components/forms/AuthForm'
import { authService } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'

const perks = [
  '$20,000 in virtual funds',
  'Full access to live market prices',
  'Practise on web and mobile platforms',
  'No card details required',
]

const DemoAccount: React.FC = () => {
  const navigate = useNavigate()
  const { save } = useAuth()

  return (
    <Section>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">
              Practise with a free demo account
            </h1>
            <p className="mt-4 text-ink-700/80 leading-relaxed">
              Explore our platforms and try out strategies risk-free, using virtual funds in a live market
              environment.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <FiCheck className="text-signal-up shrink-0" />
                  <span className="text-ink-800">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-ink-950">Create your demo account</h2>
            <p className="mt-1 text-sm text-ink-700/70">Get instant access to a simulated trading environment.</p>
            <div className="mt-6">
              <AuthForm
                mode="register"
                onSubmit={({ fullName, email, password }) =>
                  authService.register({ fullName: fullName ?? '', email, password })
                }
                onSuccess={(result) => {
                  if (result.user) save({ token: result.token, user: result.user })
                  navigate('/', { replace: true })
                }}
              />
            </div>
            <p className="mt-4 text-center text-sm">
              Ready to trade for real?{' '}
              <Link to="/open-account" className="font-semibold text-brand-600 hover:text-brand-700">
                Open a live account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default DemoAccount