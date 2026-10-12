import { Avatar, Badge, HoverCard, HoverCardContent, HoverCardTrigger } from '@juanarenas312002/ams-ui'

export default function Teacher() {
  return (
    <p className="text-sm text-fg-muted">
      Docente a cargo:{' '}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#/hover-card" className="font-medium text-accent underline underline-offset-4">
            Carolina Reyes
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar name="Carolina Reyes" />
            <div>
              <p className="font-display font-semibold text-fg">Carolina Reyes</p>
              <p className="text-xs text-fg-subtle">Matemáticas · Directora de 3.º A</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="accent">3 cursos</Badge>
            <Badge>96 estudiantes</Badge>
          </div>
        </HoverCardContent>
      </HoverCard>
    </p>
  )
}
