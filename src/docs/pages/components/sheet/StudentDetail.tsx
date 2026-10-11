import { Avatar, Badge, Button, Separator, Sheet, SheetClose, SheetContent, SheetTrigger } from '@ams/ui'

const grades = [
  ['Matemáticas', '9,4'],
  ['Física', '9,1'],
  ['Lenguaje', '8,7'],
  ['Química', '9,2'],
]

export default function StudentDetail() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Ver ficha de Sofía</Button>
      </SheetTrigger>
      <SheetContent
        title="Sofía Restrepo"
        description="3.º A · Jornada mañana"
        footer={
          <>
            <SheetClose asChild>
              <Button variant="ghost">Cerrar</Button>
            </SheetClose>
            <Button>Descargar boletín</Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <Avatar name="Sofía Restrepo" size="lg" />
          <div className="flex flex-col gap-1.5">
            <Badge variant="success" dot>
              Al día
            </Badge>
            <span className="text-sm text-fg-muted">Promedio 9,6 · Asistencia 98 %</span>
          </div>
        </div>
        <Separator className="my-5" />
        <h3 className="font-display font-semibold">Notas del período</h3>
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          {grades.map(([subject, grade]) => (
            <div key={subject} className="flex justify-between rounded-sm bg-sunken px-3 py-2">
              <dt className="text-fg-muted">{subject}</dt>
              <dd className="font-display font-semibold text-accent">{grade}</dd>
            </div>
          ))}
        </dl>
      </SheetContent>
    </Sheet>
  )
}
