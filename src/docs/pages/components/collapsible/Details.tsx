import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ams/ui'

export default function Details() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="glass w-full max-w-md rounded-md">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-5 py-4 text-left">
        <span>
          <span className="block font-display font-medium">Pensión · Abril</span>
          <span className="text-sm text-fg-muted">$ 850.000 · Pagado</span>
        </span>
        <ChevronDown aria-hidden className={`size-4.5 shrink-0 text-accent transition-transform duration-(--duration-base) ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border px-5 py-4 text-sm">
          <dt className="text-fg-subtle">Fecha de pago</dt>
          <dd>3 de abril de 2026</dd>
          <dt className="text-fg-subtle">Medio</dt>
          <dd>Transferencia PSE</dd>
          <dt className="text-fg-subtle">Recibo</dt>
          <dd>0142</dd>
        </dl>
      </CollapsibleContent>
    </Collapsible>
  )
}
