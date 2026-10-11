import { useState } from 'react'
import { Copy, Download, FileText, Pencil, Trash2 } from 'lucide-react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from '@ams/ui'

export default function FileCard() {
  const [last, setLast] = useState('ninguna')
  return (
    <div className="flex flex-col items-center gap-3">
      <ContextMenu>
        <ContextMenuTrigger className="glass flex w-72 items-center gap-3 rounded-lg p-4 select-none data-[state=open]:border-accent-border">
          <FileText aria-hidden className="size-8 text-accent" />
          <div>
            <p className="font-medium">Boletín 3.º A · P1.pdf</p>
            <p className="text-xs text-fg-subtle">Clic derecho (o Mayús+F10) para ver acciones</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Boletín 3.º A · P1</ContextMenuLabel>
          <ContextMenuItem icon={<Download />} shortcut="Ctrl+D" onSelect={() => setLast('Descargar')}>
            Descargar
          </ContextMenuItem>
          <ContextMenuItem icon={<Pencil />} onSelect={() => setLast('Renombrar')}>
            Renombrar
          </ContextMenuItem>
          <ContextMenuItem icon={<Copy />} onSelect={() => setLast('Copiar enlace')}>
            Copiar enlace
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem icon={<Trash2 />} destructive onSelect={() => setLast('Eliminar')}>
            Eliminar
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="text-sm text-fg-muted">Última acción: {last}</p>
    </div>
  )
}
