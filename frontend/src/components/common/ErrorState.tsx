interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) => (
  <div role="alert" className="py-8 text-center">
    <p className="text-ink-700">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Try again
      </button>
    )}
  </div>
)

export default ErrorState
