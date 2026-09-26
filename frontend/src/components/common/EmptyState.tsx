interface EmptyStateProps {
  title: string
  description?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <div className="py-12 text-center border border-dashed border-ink-900/15 rounded-2xl">
    <p className="font-semibold text-ink-900">{title}</p>
    {description && <p className="mt-1 text-sm text-ink-700/80">{description}</p>}
  </div>
)

export default EmptyState
