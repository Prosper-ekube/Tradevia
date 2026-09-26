interface LoadingStateProps {
  label?: string
  rows?: number
}

const LoadingState: React.FC<LoadingStateProps> = ({ label = 'Loading', rows = 3 }) => (
  <div role="status" aria-live="polite" className="py-8">
    <span className="sr-only">{label}</span>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-ink-900/5 animate-pulse" />
      ))}
    </div>
  </div>
)

export default LoadingState
