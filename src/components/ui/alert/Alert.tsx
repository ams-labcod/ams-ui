import type { ComponentProps, ReactNode } from 'react'
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '../../../lib/cn'

export const alertVariants = {
  info: { icon: Info, box: 'border-info-border bg-info-soft', tint: 'text-info' },
  success: { icon: CircleCheck, box: 'border-success-border bg-success-soft', tint: 'text-success' },
  warning: { icon: TriangleAlert, box: 'border-warning-border bg-warning-soft', tint: 'text-warning' },
  danger: { icon: CircleX, box: 'border-danger-border bg-danger-soft', tint: 'text-danger' },
} as const

export type AlertVariant = keyof typeof alertVariants

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title'> {
  variant?: AlertVariant
  title?: ReactNode
  /** Botones o enlaces bajo el mensaje. */
  action?: ReactNode
  /** Si se pasa, muestra el botón de cerrar. */
  onDismiss?: () => void
}

export function Alert({ variant = 'info', title, action, onDismiss, className, children, ...props }: AlertProps) {
  const v = alertVariants[variant]
  const Icon = v.icon
  // warning y danger interrumpen al lector de pantalla; info y success se anuncian sin cortar.
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status'
  return (
    <div role={role} className={cn('flex gap-3 rounded-md border p-4 text-sm', v.box, className)} {...props}>
      <Icon aria-hidden className={cn('mt-0.5 size-4.5 shrink-0', v.tint)} />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold text-fg">{title}</p>}
        {children && <div className={cn('leading-relaxed text-fg-muted', title && 'mt-1')}>{children}</div>}
        {action && <div className="mt-3 flex flex-wrap gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar aviso"
          className="-m-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-hover hover:text-fg"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
