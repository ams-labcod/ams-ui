import { useState } from 'react'
import { Switch } from '@juanarenas312002/ams-ui'

export default function Basic() {
  const [push, setPush] = useState(true)
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Switch
        label="Notificaciones push"
        description={push ? 'Recibirás un aviso al publicar notas.' : 'No recibirás avisos en el móvil.'}
        checked={push}
        onChange={(e) => setPush(e.target.checked)}
      />
      <Switch label="Resumen semanal por correo" defaultChecked />
      <Switch label="Modo sin conexión" description="Disponible en el plan Profesional." disabled />
    </div>
  )
}
