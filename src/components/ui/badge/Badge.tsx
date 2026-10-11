import type { ComponentProps } from 'react'
import { cn } from '../../../lib/cn'

const variants = {
  neutral: 'border-border bg-sunken text-fg-muted',
  accent: 'border-accent-border bg-accent-soft text-accent',
  info: 'border-info-border bg-info-soft text-info',
  success: 'border-success-border bg-success-soft text-success',
  warning: 'border-warning-border bg-warning-soft text-warning',
  danger: 'border-danger-border bg-danger-soft text-danger',
  solid: 'border-transparent bg-primary font-semibold text-on-primary',
} as const

export type BadgeVariant = keyof typeof variants

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant
  /** Punto de color delante del texto; 'pulse' lo anima (estado en vivo). */
  dot?: boolean | 'pulse'
}

export function Badge({ variant = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap', variants[variant], className)}
      {...props}
    >
      {dot && <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full bg-current', dot === 'pulse' && 'animate-pulse-ring')} />}
      {children}
    </span>
  )
}
