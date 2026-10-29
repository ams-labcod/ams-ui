import { useState } from 'react'
import { Alert, Button } from '@ams-labcod/ams-ui'

export default function Actions() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Button variant="secondary" onClick={() => setVisible(true)}>
        Mostrar aviso
      </Button>
    )
  }

  return (
    <Alert
      className="w-full max-w-xl"
      variant="warning"
      title="Tienes 3 pagos sin conciliar"
      onDismiss={() => setVisible(false)}
      action={
        <>
          <Button size="sm">Conciliar ahora</Button>
          <Button size="sm" variant="ghost">
            Ver detalle
          </Button>
        </>
      }
    >
      Los extractos de mayo ya están disponibles.
    </Alert>
  )
}
