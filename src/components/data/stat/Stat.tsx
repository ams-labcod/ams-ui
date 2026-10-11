import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '../../../lib/cn'

export interface StatDelta {
  /** Texto ya formateado: «+12», «−3,1 %». */
  value: string
  direction: 'up' | 'down' | 'flat'
  /** Si subir es bueno (matrículas) o malo (inasistencias). Decide el color. */
  upIsGood?: boolean
  /** Periodo de comparación: «vs. mes anterior». */
  label?: string
}

export interface StatProps {
  label: string
  value: ReactNode
  delta?: StatDelta
  /** Un elemento visual a la derecha: ProgressRing, icono… */
  aside?: ReactNode
  className?: string
}

/** Cifra destacada con etiqueta y variación, como las cifras del hero y la banda de estadísticas de la referencia. */
export function Stat({ label, value, delta, aside, className }: StatProps) {
  const good = delta && delta.direction !== 'flat' && (delta.direction === 'up') === (delta.upIsGood ?? true)
  const Icon = delta?.direction === 'up' ? ArrowUpRight : delta?.direction === 'down' ? ArrowDownRight : Minus
  return (
    <div className={cn('glass flex items-center justify-between gap-4 rounded-lg p-5', className)}>
      <div className="min-w-0">
        <p className="text-sm text-fg-muted">{label}</p>
        <p className="mt-1 font-display text-[2rem] leading-none font-semibold tracking-[-0.02em] text-fg">{value}</p>
        {delta && (
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium',
                delta.direction === 'flat' ? 'bg-sunken text-fg-muted' : good ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger',
              )}
            >
              <Icon aria-hidden className="size-3.5" />
              <span className="sr-only">{delta.direction === 'up' ? 'Sube' : delta.direction === 'down' ? 'Baja' : 'Sin cambio'}</span>
              {delta.value}
            </span>
            {delta.label && <span className="text-fg-subtle">{delta.label}</span>}
          </p>
        )}
      </div>
      {aside}
    </div>
  )
}
