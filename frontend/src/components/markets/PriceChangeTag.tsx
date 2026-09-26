import { formatChange } from '@/utils/format'
import { classNames } from '@/utils/format'

const PriceChangeTag: React.FC<{ value?: number }> = ({ value }) => {
  if (value === undefined) return null
  const positive = value >= 0
  return (
    <span
      className={classNames(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums',
        positive ? 'bg-signal-up/10 text-signal-up' : 'bg-signal-down/10 text-signal-down',
      )}
    >
      {formatChange(value)}
    </span>
  )
}

export default PriceChangeTag
