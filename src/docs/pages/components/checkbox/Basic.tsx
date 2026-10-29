import { Checkbox } from '@ams-labcod/ams-ui'

export default function Basic() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Enviar boletín por correo" defaultChecked />
      <Checkbox label="Incluir observaciones del docente" description="Se añaden al final de cada boletín." />
      <Checkbox label="Firmado por el rector" disabled />
    </div>
  )
}
