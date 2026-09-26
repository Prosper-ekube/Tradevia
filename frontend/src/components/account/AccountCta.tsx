import { Link } from 'react-router-dom'

const AccountCta: React.FC = () => (
  <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-ink-950 text-white p-8 sm:p-12">
    <div className="max-w-2xl">
      <h2 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">
        Ready to start trading?
      </h2>
      <p className="mt-4 text-white/75 leading-relaxed">
        Open a live account in minutes, or practise first with $20,000 in virtual funds on a free demo
        account &mdash; no card details required.
      </p>
      <div className="mt-7 flex flex-wrap gap-4">
        <Link
          to="/open-account"
          className="rounded-full bg-white text-ink-950 px-6 py-3.5 font-semibold hover:bg-white/90 transition-colors"
        >
          Open an account
        </Link>
        <Link
          to="/demo-account"
          className="rounded-full border border-white/30 px-6 py-3.5 font-semibold hover:border-white/60 transition-colors"
        >
          Try a free demo
        </Link>
      </div>
    </div>
  </div>
)

export default AccountCta
