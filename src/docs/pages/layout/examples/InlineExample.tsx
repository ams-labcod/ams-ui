import { Badge, Button, Inline } from '@juanarenas312002/ams-ui'

export default function InlineExample() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Inline gap={2}>
        <Badge variant="accent">Matemáticas</Badge>
        <Badge>3.º A</Badge>
        <Badge>Jornada mañana</Badge>
        <Badge variant="success">Al día</Badge>
      </Inline>
      <Inline gap={3} justify="end">
        <Button variant="ghost">Cancelar</Button>
        <Button>Guardar</Button>
      </Inline>
    </div>
  )
}
