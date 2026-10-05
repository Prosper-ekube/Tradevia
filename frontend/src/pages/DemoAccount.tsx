import { useEffect } from 'react'
import Section from '@/components/common/Section'
import Container from '@/components/common/Container'
import { IG_LINKS } from '@/data/igLinks'

const DemoAccount: React.FC = () => {
  useEffect(() => {
    window.location.replace(IG_LINKS.demo)
  }, [])

  return (
    <Section>
      <Container className="max-w-md text-center">
        <h1 className="text-3xl font-display font-semibold">Redirecting you to IG</h1>
        <p className="mt-4 text-ink-700/80 leading-relaxed">
          You&rsquo;re being redirected to IG Group&rsquo;s official demo-account page.
        </p>
        <a
          href={IG_LINKS.demo}
          className="mt-6 inline-flex rounded-full bg-brand-500 text-white px-6 py-3 font-semibold hover:bg-brand-600 transition-colors"
        >
          Continue to IG
        </a>
      </Container>
    </Section>
  )
}

export default DemoAccount