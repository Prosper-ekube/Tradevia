import { Link } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import { AuthForm } from '@/components/forms/AuthForm'
import { authService } from '@/services/authService'

const Login: React.FC = () => (
  <Section>
    <Container className="max-w-md">
      <h1 className="text-3xl font-display font-semibold text-center">Log in</h1>
      <p className="mt-2 text-center text-sm text-ink-700/70">
        Access your account to view positions, manage funds and trade.
      </p>
      <div className="mt-8 mx-auto max-w-xl rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
        <AuthForm
          mode="login"
          onSubmit={async ({ email, password }) => {
            await authService.login({ email, password })
          }}
        />
      </div>
      <p className="mt-6 text-center text-sm text-ink-700/70">
        New to Tradevia?{' '}
        <Link to="/open-account" className="font-semibold text-brand-600 hover:text-brand-700">
          Open an account
        </Link>
      </p>
    </Container>
  </Section>
)

export default Login
