import { useState } from 'react'
import { Calendar, formatDate } from '@ams-labcod/ams-ui'

const year = new Date().getFullYear()
const month = new Date().getMonth()
const events = [3, 9, 15, 22, 27].map((d) => new Date(year, month, d))

export default function Events() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar value={date} onChange={setDate} events={events} isDisabled={(d) => d.getDay() === 0} />
      <p className="text-sm text-fg-muted" aria-live="polite">
        {date ? `Elegiste el ${formatDate(date, 'es', { weekday: 'long', day: 'numeric', month: 'long' })}.` : 'Elige un día. Los domingos no hay clases.'}
      </p>
    </div>
  )
}
