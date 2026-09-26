import { Link } from 'react-router-dom'

interface AccountTypeCardProps {
  name: string
  tagline: string
  points: string[]
  highlighted?: boolean
}

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({ name, tagline, points, highlighted }) => (
  <div
    className={`rounded-2xl p-6 border flex flex-col ${
      highlighted ? 'border-brand-500 bg-brand-50' : 'border-ink-900/10 bg-white'
    }`}
  >
    {highlighted && (
      <span className="self-start text-xs font-semibold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full mb-3">
        Most popular
      </span>
    )}
    <h3 className="text-lg font-semibold text-ink-950">{name}</h3>
    <p className="mt-1 text-sm text-ink-700/75">{tagline}</p>
    <ul className="mt-4 space-y-2 flex-1">
      {points.map((p) => (
        <li key={p} className="flex gap-2 text-sm text-ink-700/90">
          <span className="text-brand-500 font-semibold">&bull;</span>
          {p}
        </li>
      ))}
    </ul>
    <Link
      to="/open-account"
      className="mt-5 inline-flex justify-center rounded-full bg-ink-950 text-white text-sm font-semibold px-5 py-2.5 hover:bg-ink-900 transition-colors"
    >
      Get started
    </Link>
  </div>
)

export default AccountTypeCard
