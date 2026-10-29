import { useState } from 'react'
import { Button } from '@ams-labcod/ams-ui'

export default function States() {
  const [saving, setSaving] = useState(false)

  function save() {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <>
      <Button loading={saving} onClick={save}>
        {saving ? 'Guardando…' : 'Guardar'}
      </Button>
      <Button disabled>Deshabilitado</Button>
      <Button variant="secondary" disabled>
        Deshabilitado
      </Button>
    </>
  )
}
