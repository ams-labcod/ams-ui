import type { ComponentProps } from 'react'
import { HoverCard as H } from 'radix-ui'
import { cn } from '../../../lib/cn'

/** Vista previa al pasar el puntero sobre un enlace. Solo para información complementaria. */
export function HoverCard({ openDelay = 400, closeDelay = 150, ...props }: ComponentProps<typeof H.Root>) {
  return <H.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />
}

export const HoverCardTrigger = H.Trigger

export function HoverCardContent({ className, sideOffset = 8, align = 'start', ...props }: ComponentProps<typeof H.Content>) {
  return (
    <H.Portal>
      <H.Content
        sideOffset={sideOffset}
        align={align}
        className={cn('z-(--z-popover) w-72 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-surface p-4 text-sm text-fg shadow-pop outline-none animate-overlay-in', className)}
        {...props}
      />
    </H.Portal>
  )
}
