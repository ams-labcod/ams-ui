import { useState } from 'react'
import { Slider as S } from 'radix-ui'
import { cn } from '../../../lib/cn'

export interface SliderProps {
  /** Un número o un par [desde, hasta] para elegir un rango. */
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onValueChange?: (value: number | [number, number]) => void
  /** Se llama al soltar: útil para filtrar o guardar sin recalcular en cada paso. */
  onValueCommit?: (value: number | [number, number]) => void
  min?: number
  max?: number
  step?: number
  /** Nombre visible y accesible. */
  label: string
  /** Cómo se muestra el valor: «8,5», «$ 850.000»… */
  formatValue?: (value: number) => string
  /** Marcas de min y max bajo la barra. */
  showBounds?: boolean
  disabled?: boolean
  name?: string
  className?: string
}

const toArray = (v: number | [number, number] | undefined) => (v === undefined ? undefined : Array.isArray(v) ? v : [v])

export function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue = String,
  showBounds = false,
  disabled,
  name,
  className,
}: SliderProps) {
  const range = Array.isArray(value ?? defaultValue)
  const [inner, setInner] = useState<number[]>(toArray(defaultValue) ?? [min])
  const current = toArray(value) ?? inner
  const out = (v: number[]) => (range ? ([v[0]!, v[1]!] as [number, number]) : v[0]!)
  // Flecha explícita: map pasaría también índice y array (formatCurrency los tomaría como moneda e idioma).
  const text = current.map((v) => formatValue(v)).join(' – ')

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-fg">{label}</span>
        <output className="font-display font-semibold text-accent tabular-nums">{text}</output>
      </div>
      <S.Root
        value={current}
        onValueChange={(v) => {
          setInner(v)
          onValueChange?.(out(v))
        }}
        onValueCommit={(v) => onValueCommit?.(out(v))}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={range ? 1 : undefined}
        disabled={disabled}
        name={name}
        className="relative flex h-5 w-full touch-none items-center select-none data-disabled:state-disabled"
      >
        <S.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-hover">
          <S.Range className="absolute h-full rounded-full bg-gradient-primary" />
        </S.Track>
        {current.map((v, i) => (
          <S.Thumb
            key={i}
            aria-label={range ? `${label}: ${i === 0 ? 'desde' : 'hasta'}` : label}
            aria-valuetext={formatValue(v)}
            className="block size-5 cursor-grab rounded-full border-2 border-teal-300 bg-surface shadow-glow transition-[scale] duration-(--duration-fast) hover:scale-110 active:cursor-grabbing"
          />
        ))}
      </S.Root>
      {showBounds && (
        <div className="flex justify-between text-xs text-fg-subtle tabular-nums">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  )
}
