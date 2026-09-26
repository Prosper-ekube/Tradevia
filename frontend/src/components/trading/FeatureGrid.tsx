import type { IconType } from 'react-icons'

interface Feature {
  icon: IconType
  title: string
  description: string
}

const FeatureGrid: React.FC<{ features: Feature[] }> = ({ features }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {features.map((f) => (
      <div key={f.title} className="rounded-2xl border border-ink-900/10 bg-white p-6">
        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
          <f.icon size={20} />
        </div>
        <h3 className="mt-4 font-semibold text-ink-950">{f.title}</h3>
        <p className="mt-1.5 text-sm text-ink-700/80 leading-relaxed">{f.description}</p>
      </div>
    ))}
  </div>
)

export default FeatureGrid
