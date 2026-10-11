import { FormField, Textarea } from '@ams/ui'

export default function Required() {
  return (
    <FormField className="w-full max-w-lg" label="Motivo del retiro" required error="Explica el motivo; quedará en el historial del estudiante.">
      <Textarea />
    </FormField>
  )
}
