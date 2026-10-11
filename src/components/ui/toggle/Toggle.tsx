import type { ComponentProps } from 'react'
import { Toggle as T } from 'radix-ui'
import { cn } from '../../../lib/cn'

const sizes = { sm: 'h-control-sm min-w-control-sm px-2.5 text-[13px]', md: 'h-control-md min-w-control-md px-3.5 text-sm' } as const

export interface ToggleProps extends ComponentProps<typeof T.Root> {
  /** outline añade borde: úsalo cuando el botón no está dentro de una barra. */
  variant?: 'default' | 'outline'
  size?: keyof typeof sizes
}

/** Botón que se queda pulsado (aria-pressed): negrita, fijar, mostrar notas ocultas… */
export function Toggle({ variant = 'default', size = 'md', className, ...props }: ToggleProps) {
  return (
    <T.Root
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium text-fg-muted transition-colors duration-(--duration-fast) [&_svg]:size-4',
        'hover:bg-hover hover:text-fg disabled:state-disabled',
        'data-[state=on]:bg-accent-soft data-[state=on]:text-accent',
        variant === 'outline' && 'border border-border data-[state=on]:border-accent-border',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
