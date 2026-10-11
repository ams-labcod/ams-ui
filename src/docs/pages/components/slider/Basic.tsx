import { useState } from 'react'
import { formatCurrency, Slider } from '@ams/ui'

export default function Basic() {
  const [range, setRange] = useState<[number, number]>([6, 9])
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Slider label="Nota mínima para aprobar" defaultValue={6} min={1} max={10} step={0.5} formatValue={(n) => n.toLocaleString('es')} showBounds />
      <Slider
        label="Promedio entre"
        value={range}
        onValueChange={(v) => setRange(v as [number, number])}
        min={1}
        max={10}
        step={0.1}
        formatValue={(n) => n.toLocaleString('es', { minimumFractionDigits: 1 })}
      />
      <Slider label="Descuento por hermanos" defaultValue={120000} min={0} max={400000} step={10000} formatValue={formatCurrency} />
      <Slider label="Cupo máximo por curso" defaultValue={35} max={45} disabled />
    </div>
  )
}
