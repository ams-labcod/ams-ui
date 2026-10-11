import type { ComponentProps } from 'react'
import { ScrollArea as S } from 'radix-ui'
import { cn } from '../../../lib/cn'

export interface ScrollAreaProps extends ComponentProps<typeof S.Root> {
  /** Añade barra horizontal además de la vertical. */
  horizontal?: boolean
  /** Nombre del área para lectores de pantalla; la hace enfocable para desplazarla con el teclado. */
  'aria-label'?: string
}

const bar =
  'flex touch-none p-0.5 transition-colors duration-(--duration-fast) select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5'

// Barras finas con el color de la marca, iguales en todos los sistemas operativos.
export function ScrollArea({ horizontal = false, className, children, 'aria-label': ariaLabel, ...props }: ScrollAreaProps) {
  return (
    <S.Root className={cn('relative overflow-hidden', className)} {...props}>
      <S.Viewport
        aria-label={ariaLabel}
        tabIndex={ariaLabel ? 0 : undefined}
        role={ariaLabel ? 'region' : undefined}
        className="size-full rounded-[inherit]"
      >
        {children}
      </S.Viewport>
      <S.Scrollbar orientation="vertical" className={bar}>
        <S.Thumb className="relative flex-1 rounded-full bg-border-strong hover:bg-fg-subtle" />
      </S.Scrollbar>
      {horizontal && (
        <S.Scrollbar orientation="horizontal" className={bar}>
          <S.Thumb className="relative flex-1 rounded-full bg-border-strong hover:bg-fg-subtle" />
        </S.Scrollbar>
      )}
      <S.Corner />
    </S.Root>
  )
}
