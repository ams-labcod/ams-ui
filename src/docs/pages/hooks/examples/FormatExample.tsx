import { cn, formatBytes, formatCurrency, formatDate, formatNumber } from '@ams/ui'

const archived = false

const rows = [
  ['formatNumber(1250000)', formatNumber(1250000)],
  ['formatCurrency(850000)', formatCurrency(850000)],
  ['formatBytes(5_200_000)', formatBytes(5_200_000)],
  ['formatDate(new Date(2026, 3, 5))', formatDate(new Date(2026, 3, 5))],
  ["cn('px-4 text-fg', archived && 'hidden', 'px-6')", cn('px-4 text-fg', archived && 'hidden', 'px-6')],
]

export default function FormatExample() {
  return (
    <dl className="grid w-full max-w-lg grid-cols-[1fr_auto] gap-x-6 gap-y-2 text-sm">
      {rows.map(([call, out]) => (
        <div key={call} className="contents">
          <dt className="font-mono text-xs text-fg-muted">{call}</dt>
          <dd className="text-right font-medium text-fg">{out}</dd>
        </div>
      ))}
    </dl>
  )
}
