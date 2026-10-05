import { IG_LINKS } from '@/data/igLinks'

const AccountCta: React.FC = () => (
  <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-ink-950 text-white p-8 sm:p-12">
    <div className="max-w-3xl">
      <h2 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">
        Ready to start trading?
      </h2>
      <p className="mt-4 text-white/75 leading-relaxed">
        Open a live account directly with IG Group, or practise first on IG&rsquo;s free demo account.
        Tradevia is an independent marketing site &mdash; your account is opened and managed by IG.
      </p>
      <div className="mt-7 flex flex-wrap gap-4">
        <a
          href={IG_LINKS.openAccount}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white text-ink-950 px-6 py-3.5 font-semibold hover:bg-white/90 transition-colors"
        >
          Open an account
        </a>
        <a
          href={IG_LINKS.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/30 px-6 py-3.5 font-semibold hover:border-white/60 transition-colors"
        >
          Try a free demo
        </a>
      </div>
    </div>
  </div>
)

export default AccountCta