interface Stat {
  label: string
  value: string
}

const StatStrip: React.FC<{ stats: Stat[]; light?: boolean }> = ({ stats, light }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
    {stats.map((s) => (
      <div key={s.label}>
        <p className={`text-2xl sm:text-3xl font-display font-semibold ${light ? 'text-white' : 'text-ink-950'}`}>{s.value}</p>
        <p className={`mt-1 text-sm ${light ? 'text-white/60' : 'text-ink-700/70'}`}>{s.label}</p>
      </div>
    ))}
  </div>
)

export default StatStrip
