import { FormField, Select } from '@ams/ui'

const periods = [
  { value: 'p1', label: 'Primer período' },
  { value: 'p2', label: 'Segundo período' },
]

export default function States() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <FormField label="Período" required error="Elige el período que vas a calificar.">
        <Select options={periods} />
      </FormField>
      <FormField label="Sede" disabled>
        <Select options={[{ value: 'norte', label: 'Sede Norte' }]} defaultValue="norte" />
      </FormField>
    </div>
  )
}
