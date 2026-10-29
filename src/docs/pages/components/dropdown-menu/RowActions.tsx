import { useState } from 'react'
import { Copy, Ellipsis, FileText, Pencil, UserMinus } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ams-labcod/ams-ui'

export default function RowActions() {
  const [last, setLast] = useState('ninguna')
  return (
    <div className="flex flex-col items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" aria-label="Acciones para Sofía Restrepo">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sofía Restrepo</DropdownMenuLabel>
          <DropdownMenuItem icon={<Pencil />} shortcut="E" onSelect={() => setLast('Editar')}>
            Editar datos
          </DropdownMenuItem>
          <DropdownMenuItem icon={<FileText />} onSelect={() => setLast('Ver boletín')}>
            Ver boletín
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Copy />} disabled>
            Duplicar matrícula
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<UserMinus />} destructive onSelect={() => setLast('Retirar')}>
            Retirar del curso
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-sm text-fg-muted">Última acción: {last}</p>
    </div>
  )
}
