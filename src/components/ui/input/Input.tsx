import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { controlClass, useFieldControl } from '../field/Field'

export interface InputProps extends ComponentProps<'input'> {
  /** Icono decorativo a la izquierda (p. ej. búsqueda). */
  startIcon?: ReactNode
}

export function Input({ startIcon, className, ...props }: InputProps) {
  const control = useFieldControl(props)
  const input = <input {...control} className={cn(controlClass, 'h-control-md', startIcon && 'pl-10', className)} />
  if (!startIcon) return input
  return (
    <div className="relative">
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg-subtle [&_svg]:size-4">
        {startIcon}
      </span>
      {input}
    </div>
  )
}
