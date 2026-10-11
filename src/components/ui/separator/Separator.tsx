import type { ComponentProps } from 'react'
import { cn } from '../../../lib/cn'

export interface SeparatorProps extends ComponentProps<'div'> {
  orientation?: 'horizontal' | 'vertical'
  /** Solo visual: los lectores de pantalla lo ignoran. */
  decorative?: boolean
}

export function Separator({ orientation = 'horizontal', decorative = false, className, ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={!decorative && orientation === 'vertical' ? 'vertical' : undefined}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch', className)}
      {...props}
    />
  )
}
