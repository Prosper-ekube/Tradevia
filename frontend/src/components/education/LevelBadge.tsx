import { classNames } from '@/utils/format'

const levelColors: Record<string, string> = {
  Beginner: 'bg-signal-up/10 text-signal-up',
  Intermediate: 'bg-sand/20 text-[#8a6c1f]',
  Advanced: 'bg-signal-down/10 text-signal-down',
}

const LevelBadge: React.FC<{ level: string }> = ({ level }) => (
  <span className={classNames('text-xs font-semibold px-2.5 py-1 rounded-full', levelColors[level] ?? 'bg-ink-900/5 text-ink-700')}>
    {level}
  </span>
)

export default LevelBadge
