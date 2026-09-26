interface PlatformCardProps {
  name: string
  description: string
  points: string[]
}

const PlatformCard: React.FC<PlatformCardProps> = ({ name, description, points }) => (
  <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
    <h3 className="text-lg font-semibold text-ink-950">{name}</h3>
    <p className="mt-2 text-sm text-ink-700/80 leading-relaxed">{description}</p>
    <ul className="mt-4 space-y-2">
      {points.map((p) => (
        <li key={p} className="flex gap-2 text-sm text-ink-700/90">
          <span className="text-brand-500 font-semibold">&bull;</span>
          {p}
        </li>
      ))}
    </ul>
  </div>
)

export default PlatformCard
