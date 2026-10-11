import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../../lib/cn'

export interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Lo que la persona puede hacer para salir del estado vacío. */
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)} {...props}>
      {icon && (
        <div
          aria-hidden
          className="mb-5 flex size-13 items-center justify-center rounded-[14px] border border-accent-border bg-[linear-gradient(135deg,rgb(77_182_172/0.25),rgb(77_182_172/0.05))] text-accent [&_svg]:size-5.5"
        >
          {icon}
        </div>
      )}
      <h3 className="font-display text-h3 font-semibold text-fg">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-pretty text-fg-muted">{description}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  )
}
