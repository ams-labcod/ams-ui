import { Button, Sheet, SheetContent, SheetTrigger, type SheetContentProps } from '@juanarenas312002/ams-ui'

const sides: { side: NonNullable<SheetContentProps['side']>; label: string }[] = [
  { side: 'left', label: 'Izquierda' },
  { side: 'right', label: 'Derecha' },
  { side: 'top', label: 'Arriba' },
  { side: 'bottom', label: 'Abajo' },
]

export default function Sides() {
  return (
    <>
      {sides.map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              {label}
            </Button>
          </SheetTrigger>
          <SheetContent side={side} title={`Panel ${label.toLowerCase()}`} description="En móvil, abajo es la posición más cómoda para el pulgar.">
            <p className="text-sm text-fg-muted">Contenido del panel.</p>
          </SheetContent>
        </Sheet>
      ))}
    </>
  )
}
