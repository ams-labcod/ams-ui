import { useState } from 'react'
import { Calendar, formatDate, type DateRange } from '@ams-labcod/ams-ui'

const now = new Date()

export default function Range() {
  // Empieza con una semana elegida para que se vea el rango.
  const [range, setRange] = useState<DateRange>({ from: new Date(now.getFullYear(), now.getMonth(), 9), to: new Date(now.getFullYear(), now.getMonth(), 16) })
  const days = range.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1 : 0

  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="range" value={range} onChange={setRange} />
      <p className="text-sm text-fg-muted">
        {range.from && range.to ? `Vacaciones: del ${formatDate(range.from)} al ${formatDate(range.to)} (${days} días)` : 'Elige el inicio y el fin de las vacaciones.'}
      </p>
    </div>
  )
}
