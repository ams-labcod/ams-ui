import { useState } from 'react'
import { DatePicker, FormField } from '@ams/ui'

export default function Basic() {
  const [due, setDue] = useState<Date | null>(null)
  const today = new Date()
  const limit = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())

  return (
    <div className="grid w-full max-w-sm gap-5">
      <FormField label="Fecha de entrega" description="Hasta dos meses desde hoy, sin fines de semana.">
        <DatePicker value={due} onChange={setDue} min={today} max={limit} isDisabled={(d) => d.getDay() === 0 || d.getDay() === 6} name="due" />
      </FormField>
      <FormField label="Reunión de acudientes" required error="Elige la fecha de la reunión.">
        <DatePicker />
      </FormField>
    </div>
  )
}
