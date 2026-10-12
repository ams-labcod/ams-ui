import { SlidersHorizontal } from 'lucide-react'
import { Button, Checkbox, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@juanarenas312002/ams-ui'

export default function Filters() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <SlidersHorizontal />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filtros de estudiantes" align="start">
        <p className="font-display font-semibold">Mostrar estudiantes</p>
        <div className="mt-3 flex flex-col gap-3">
          <Checkbox label="Con notas pendientes" defaultChecked />
          <Checkbox label="Con inasistencias" />
          <Checkbox label="Con pagos atrasados" />
        </div>
        <div className="mt-4 flex justify-end">
          <PopoverClose asChild>
            <Button size="sm">Aplicar</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
