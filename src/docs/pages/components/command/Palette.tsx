import { useEffect, useState } from 'react'
import { BookOpen, CalendarDays, ChartColumn, LayoutDashboard, Settings, UserPlus, Users } from 'lucide-react'
import { Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@juanarenas312002/ams-ui'

export default function Palette() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState('')

  // Alt+J abre la paleta en este ejemplo (Ctrl+K ya lo usa la documentación).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'j') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function run(action: string) {
    setLast(action)
    setOpen(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Abrir paleta <kbd className="font-sans text-xs text-fg-subtle">Alt J</kbd>
      </Button>
      {last && <p className="text-sm text-fg-muted">Ejecutaste: {last}</p>}
      <CommandDialog open={open} onOpenChange={setOpen} title="Ir a un módulo o acción">
        <CommandInput placeholder="Busca un módulo o una acción" />
        <CommandList>
          <CommandEmpty>Nada coincide. Prueba con «notas» o «matricular».</CommandEmpty>
          <CommandGroup heading="Módulos">
            <CommandItem icon={<LayoutDashboard />} onSelect={() => run('Panel')}>
              Panel
            </CommandItem>
            <CommandItem icon={<Users />} onSelect={() => run('Estudiantes')}>
              Estudiantes
            </CommandItem>
            <CommandItem icon={<BookOpen />} keywords={['notas', 'boletines']} onSelect={() => run('Calificaciones')}>
              Calificaciones
            </CommandItem>
            <CommandItem icon={<CalendarDays />} onSelect={() => run('Calendario')}>
              Calendario
            </CommandItem>
            <CommandItem icon={<ChartColumn />} onSelect={() => run('Reportes')}>
              Reportes
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Acciones">
            <CommandItem icon={<UserPlus />} shortcut="N" onSelect={() => run('Matricular estudiante')}>
              Matricular estudiante
            </CommandItem>
            <CommandItem icon={<Settings />} disabled>
              Configuración (solo administración)
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
