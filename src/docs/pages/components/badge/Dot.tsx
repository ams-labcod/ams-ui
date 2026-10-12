import { Badge } from '@juanarenas312002/ams-ui'

export default function Dot() {
  return (
    <>
      <Badge variant="accent" dot="pulse">
        Versión 4.2 disponible
      </Badge>
      <Badge variant="success" dot>
        Activo
      </Badge>
      <Badge variant="warning" dot>
        Suspendido
      </Badge>
    </>
  )
}
