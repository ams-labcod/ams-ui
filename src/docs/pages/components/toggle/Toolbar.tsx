import { useState } from 'react'
import { EyeOff, Pin, TriangleAlert } from 'lucide-react'
import { Toggle } from '@ams-labcod/ams-ui'

export default function Toolbar() {
  const [atRisk, setAtRisk] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <Toggle variant="outline" pressed={atRisk} onPressedChange={setAtRisk}>
          <TriangleAlert />
          Solo en riesgo
        </Toggle>
        <Toggle variant="outline" defaultPressed>
          <Pin />
          Fijar encabezado
        </Toggle>
        <Toggle variant="outline" aria-label="Mostrar retirados">
          <EyeOff />
        </Toggle>
        <Toggle variant="outline" disabled>
          Editar notas cerradas
        </Toggle>
      </div>
      <p className="text-sm text-fg-muted">{atRisk ? 'Mostrando 6 estudiantes en riesgo.' : 'Mostrando los 48 estudiantes.'}</p>
    </div>
  )
}
