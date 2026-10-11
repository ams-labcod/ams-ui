import type { ReactElement, ReactNode } from 'react'
import { Tooltip as T } from 'radix-ui'

export interface TooltipProps {
  content: ReactNode
  /** Un único elemento enfocable (botón, enlace). */
  children: ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Espera antes de mostrarse, en ms. */
  delay?: number
}

// Lleva su propio Provider: un tooltip funciona sin configurar nada arriba.
export function Tooltip({ content, children, side = 'top', delay = 300 }: TooltipProps) {
  return (
    <T.Provider delayDuration={delay}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content
            side={side}
            sideOffset={6}
            className="z-(--z-tooltip) max-w-64 rounded-sm bg-fg px-2.5 py-1.5 text-xs font-medium text-bg shadow-pop animate-fade-in"
          >
            {content}
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  )
}
