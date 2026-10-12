import { useState } from 'react'
import { DatePicker, DateRangePicker, FormField, type DateRange } from '@juanarenas312002/ams-ui'

export default function Range() {
  const [period, setPeriod] = useState<DateRange>({ from: null, to: null })
  const today = new Date()

  return (
    <div className="grid w-full max-w-sm gap-5">
      <FormField label="Periodo del informe de asistencia" description="Elige el día inicial y luego el final; se cierra solo al completar el rango.">
        <DateRangePicker value={period} onChange={setPeriod} max={today} name="periodo" />
      </FormField>
      {/* Para fechas lejanas, el selector de año evita pulsar la flecha decenas de veces. */}
      <FormField label="Fecha de nacimiento" description="Usa el selector de año de la cabecera.">
        <DatePicker yearRange={[today.getFullYear() - 25, today.getFullYear()]} max={today} />
      </FormField>
    </div>
  )
}
