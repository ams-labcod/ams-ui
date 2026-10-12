import { useState } from 'react'
import { Combobox, FormField } from '@juanarenas312002/ams-ui'
import { gradeLabels, students } from '../../../sample-data'

const options = students.map((s) => ({ value: s.id, label: s.name, description: `${gradeLabels[s.grade]} · ${s.id}`, disabled: s.status === 'retirado' }))

export default function Student() {
  const [id, setId] = useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FormField label="Estudiante" description="Busca por nombre, grado o código. Los retirados no se pueden elegir.">
        <Combobox options={options} value={id} onValueChange={setId} placeholder="Elige un estudiante" searchPlaceholder="Nombre, grado o código" emptyMessage="Ningún estudiante coincide." />
      </FormField>
      <p className="text-sm text-fg-muted">Código elegido: {id ?? 'ninguno'}</p>
    </div>
  )
}
