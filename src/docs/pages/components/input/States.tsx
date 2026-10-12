import { FormField, Input } from '@juanarenas312002/ams-ui'

export default function States() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <FormField label="Correo del acudiente" error="Escribe un correo con @, por ejemplo nombre@correo.com">
        <Input type="email" defaultValue="acudiente.correo.com" />
      </FormField>
      <FormField label="Código institucional" description="Lo asigna la secretaría; no se puede cambiar." disabled>
        <Input defaultValue="EST-2026-0142" />
      </FormField>
      <FormField label="Documento">
        <Input defaultValue="1.098.765.432" readOnly />
      </FormField>
    </div>
  )
}
