import { useState } from 'react'
import { RadioGroup } from '@ams-labcod/ams-ui'

export default function Basic() {
  const [shift, setShift] = useState('manana')
  return (
    <div className="flex flex-wrap gap-12">
      <RadioGroup
        label="Jornada"
        value={shift}
        onValueChange={setShift}
        options={[
          { value: 'manana', label: 'Mañana', description: '6:30 a 12:30' },
          { value: 'tarde', label: 'Tarde', description: '12:30 a 18:30' },
          { value: 'noche', label: 'Nocturna', description: 'Solo bachillerato para adultos', disabled: true },
        ]}
      />
      <RadioGroup
        label="Escala de calificación"
        orientation="horizontal"
        defaultValue="numerica"
        error="Esta escala no coincide con la del período anterior."
        options={[
          { value: 'numerica', label: 'Numérica (1–10)' },
          { value: 'letras', label: 'Letras (A–F)' },
        ]}
      />
    </div>
  )
}
