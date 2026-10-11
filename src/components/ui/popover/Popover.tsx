import type { ComponentProps } from 'react'
import { Popover as P } from 'radix-ui'
import { cn } from '../../../lib/cn'

export const Popover = P.Root
export const PopoverTrigger = P.Trigger
export const PopoverClose = P.Close
export const PopoverAnchor = P.Anchor

export function PopoverContent({ className, sideOffset = 8, align = 'center', ...props }: ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-(--z-popover) w-72 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-surface p-4 text-sm text-fg shadow-pop outline-none animate-overlay-in',
          className,
        )}
        {...props}
      />
    </P.Portal>
  )
}
