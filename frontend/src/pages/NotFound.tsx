import { Link } from 'react-router-dom'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'

const NotFound: React.FC = () => (
  <Section>
    <Container className="text-center py-16">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-display font-semibold">Page not found</h1>
      <p className="mt-4 text-ink-700/80">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-brand-500 text-white px-6 py-3 font-semibold hover:bg-brand-600 transition-colors"
      >
        Back to homepage
      </Link>
    </Container>
  </Section>
)

export default NotFound
