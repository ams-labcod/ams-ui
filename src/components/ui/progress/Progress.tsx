import type { ReactNode } from 'react'
import { Progress as P } from 'radix-ui'
import { cn } from '../../../lib/cn'

const tones = {
  accent: { bar: 'bg-gradient-primary', ring: 'stroke-teal-300', text: 'text-accent' },
  success: { bar: 'bg-success', ring: 'stroke-success', text: 'text-success' },
  warning: { bar: 'bg-warning', ring: 'stroke-warning', text: 'text-warning' },
  danger: { bar: 'bg-danger', ring: 'stroke-danger', text: 'text-danger' },
} as const

export type ProgressTone = keyof typeof tones

export interface ProgressProps {
  /** null = indeterminado (no se sabe cuánto falta). */
  value: number | null
  max?: number
  /** Nombre accesible y etiqueta visible: «Boletines enviados». */
  label: string
  /** Muestra el porcentaje a la derecha de la etiqueta. */
  showValue?: boolean
  tone?: ProgressTone
  size?: 'sm' | 'md'
  className?: string
}

const percent = (value: number, max: number) => Math.round((Math.min(Math.max(value, 0), max) / max) * 100)

export function Progress({ value, max = 100, label, showValue = false, tone = 'accent', size = 'md', className }: ProgressProps) {
  const t = tones[tone]
  const pct = value === null ? null : percent(value, max)
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-fg">{label}</span>
        {showValue && pct !== null && <span className={cn('font-display font-semibold tabular-nums', t.text)}>{pct} %</span>}
      </div>
      <P.Root
        value={value}
        max={max}
        aria-label={label}
        getValueLabel={(v, m) => `${percent(v, m)} %`}
        className={cn('relative overflow-hidden rounded-full bg-hover', size === 'sm' ? 'h-1.5' : 'h-2.5')}
      >
        <P.Indicator
          className={cn(
            'h-full rounded-full transition-[width] duration-(--duration-slow) ease-out-quint',
            t.bar,
            pct === null && 'w-1/3 animate-progress-indeterminate',
          )}
          style={pct === null ? undefined : { width: `${pct}%` }}
        />
      </P.Root>
    </div>
  )
}

export interface ProgressRingProps {
  value: number
  max?: number
  label: string
  /** Contenido del centro; por defecto el porcentaje. */
  children?: ReactNode
  /** false deja el centro vacío: úsalo si la cifra ya se muestra al lado (evita dos redondeos distintos). */
  showValue?: boolean
  tone?: ProgressTone
  /** Diámetro en px. */
  size?: number
  className?: string
}

/** Anillo de progreso, como el de asistencia de la referencia. */
export function ProgressRing({ value, max = 100, label, children, showValue = true, tone = 'accent', size = 90, className }: ProgressRingProps) {
  const pct = percent(value, max)
  const t = tones[tone]
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${pct} %`}
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden>
        <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="stroke-hover" />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          className={cn('transition-[stroke-dasharray] duration-(--duration-slow) ease-out-quint', t.ring)}
        />
      </svg>
      {showValue && (
        <span className={cn('absolute font-display font-semibold tabular-nums', t.text)} style={{ fontSize: size / 5 }}>
          {children ?? `${pct}%`}
        </span>
      )}
    </div>
  )
}
