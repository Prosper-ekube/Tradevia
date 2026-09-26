export function formatChange(value?: number): string {
  if (value === undefined) return ''
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}
