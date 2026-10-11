import { Badge } from '@ams/ui'

export default function Variants() {
  return (
    <>
      <Badge>Borrador</Badge>
      <Badge variant="accent">Matemáticas</Badge>
      <Badge variant="info">Nuevo período</Badge>
      <Badge variant="success">Aprobado</Badge>
      <Badge variant="warning">Pago pendiente</Badge>
      <Badge variant="danger">Reprobado</Badge>
      <Badge variant="solid">Más popular</Badge>
    </>
  )
}
