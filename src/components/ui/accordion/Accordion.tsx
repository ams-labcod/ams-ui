import type { ComponentProps } from 'react'
import { Accordion as A } from 'radix-ui'
import { Plus } from 'lucide-react'
import { cn } from '../../../lib/cn'

// Reproduce las FAQ de la referencia: tarjetas de vidrio separadas, signo «+»
// en un círculo turquesa que gira 45° y fondo turquesa tenue al abrir.

export function Accordion({ className, ...props }: ComponentProps<typeof A.Root>) {
  return <A.Root className={cn('flex flex-col gap-3', className)} {...props} />
}

export function AccordionItem({ className, ...props }: ComponentProps<typeof A.Item>) {
  return <A.Item className={cn('glass overflow-hidden rounded-md transition-colors duration-(--duration-base) data-[state=open]:bg-accent-soft/40', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof A.Trigger>) {
  return (
    <A.Header>
      <A.Trigger
        className={cn(
          'group/acc flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-6 py-5 text-left font-display text-base font-medium text-fg disabled:state-disabled',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="flex size-5.5 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-soft text-accent transition-transform duration-(--duration-slow) group-data-[state=open]/acc:rotate-45"
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
        </span>
      </A.Trigger>
    </A.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof A.Content>) {
  return (
    <A.Content className="overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down [--radix-collapsible-content-height:var(--radix-accordion-content-height)]" {...props}>
      <div className={cn('px-6 pb-5 text-sm leading-relaxed text-fg-muted', className)}>{children}</div>
    </A.Content>
  )
}
