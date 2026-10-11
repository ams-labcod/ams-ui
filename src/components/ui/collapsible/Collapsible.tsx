import type { ComponentProps } from 'react'
import { Collapsible as C } from 'radix-ui'
import { cn } from '../../../lib/cn'

export const Collapsible = C.Root
export const CollapsibleTrigger = C.Trigger

/** Contenido plegable con animación de altura (la mide Radix). */
export function CollapsibleContent({ className, ...props }: ComponentProps<typeof C.Content>) {
  return <C.Content className={cn('overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down', className)} {...props} />
}
