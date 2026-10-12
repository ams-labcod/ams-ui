import { RadioGroup } from '@juanarenas312002/ams-ui'

export default function Cards() {
  return (
    <RadioGroup
      className="w-full max-w-2xl"
      label="Plan"
      variant="card"
      orientation="horizontal"
      defaultValue="profesional"
      options={[
        { value: 'esencial', label: 'Esencial', description: 'Hasta 200 estudiantes · $199/mes' },
        { value: 'profesional', label: 'Profesional', description: 'Hasta 1.000 estudiantes · $449/mes' },
        { value: 'institucional', label: 'Institucional', description: 'Multi-sede · A medida' },
      ]}
    />
  )
}
