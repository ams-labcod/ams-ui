// Primitivas de composición. Tailwind solo genera clases que ve escritas, así
// que cada valor permitido aparece literal en un mapa (nada de `gap-${n}`).
import type { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

const gaps = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
} as const
export type Gap = keyof typeof gaps

const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline', stretch: 'items-stretch' } as const
const justifies = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' } as const
const directions = { row: 'flex-row', column: 'flex-col', 'row-reverse': 'flex-row-reverse', 'column-reverse': 'flex-col-reverse' } as const

type Polymorphic = { as?: ElementType; className?: string; children?: ReactNode; style?: CSSProperties } & Omit<ComponentProps<'div'>, 'className' | 'children' | 'style'>

// ---------- Flex (base de Stack e Inline) ----------

export interface FlexProps extends Polymorphic {
  direction?: keyof typeof directions
  gap?: Gap
  align?: keyof typeof aligns
  justify?: keyof typeof justifies
  wrap?: boolean
}

export function Flex({ as: Tag = 'div', direction = 'row', gap = 0, align, justify, wrap = false, className, ...props }: FlexProps) {
  return <Tag className={cn('flex', directions[direction], gaps[gap], align && aligns[align], justify && justifies[justify], wrap && 'flex-wrap', className)} {...props} />
}

/** Elementos uno debajo de otro con separación uniforme. */
export function Stack({ gap = 4, ...props }: Omit<FlexProps, 'direction' | 'wrap'>) {
  return <Flex direction="column" gap={gap} {...props} />
}

/** Elementos en fila que pasan a la siguiente línea si no caben (botones, chips, metadatos). */
export function Inline({ gap = 2, align = 'center', wrap = true, ...props }: Omit<FlexProps, 'direction'>) {
  return <Flex direction="row" gap={gap} align={align} wrap={wrap} {...props} />
}

// ---------- Container ----------

const widths = { prose: 'max-w-prose', narrow: 'max-w-3xl', page: 'max-w-page', full: 'max-w-none' } as const

export interface ContainerProps extends Polymorphic {
  /** prose ≈ 65 caracteres, narrow 768 px, page 1240 px (el de la referencia). */
  size?: keyof typeof widths
}

/** Centra el contenido con el ancho máximo y los márgenes laterales de la marca (24 px; 16 px en móvil). */
export function Container({ as: Tag = 'div', size = 'page', className, ...props }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-4 sm:px-6', widths[size], className)} {...props} />
}

// ---------- Grid ----------

const cols = {
  base: { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12' },
  sm: { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6', 12: 'sm:grid-cols-12' },
  md: { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12' },
  lg: { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12' },
} as const
type ColCount = keyof (typeof cols)['base']

export interface GridProps extends Polymorphic {
  /** Columnas fijas o por punto de corte: { base: 1, md: 2, lg: 3 }. */
  columns?: ColCount | Partial<Record<keyof typeof cols, ColCount>>
  /** Alternativa a columns: tantas columnas como quepan con este ancho mínimo (p. ej. "16rem"). */
  minItemWidth?: string
  gap?: Gap
}

export function Grid({ as: Tag = 'div', columns = 1, minItemWidth, gap = 4, className, style, ...props }: GridProps) {
  const responsive = typeof columns === 'number' ? { base: columns } : columns
  const colClasses = minItemWidth ? [] : (Object.entries(responsive) as [keyof typeof cols, ColCount][]).map(([bp, n]) => cols[bp][n])
  return (
    <Tag
      className={cn('grid', gaps[gap], colClasses, className)}
      // min(100%, …) evita desbordar en pantallas más estrechas que el mínimo.
      style={minItemWidth ? { gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minItemWidth}), 1fr))`, ...style } : style}
      {...props}
    />
  )
}

// ---------- Divider ----------

export interface DividerProps extends Omit<ComponentProps<'div'>, 'children'> {
  /** Texto en el centro de la línea: «o», «Período 2». */
  label?: ReactNode
}

/** Línea divisoria con etiqueta opcional. Sin etiqueta, usa Separator. */
export function Divider({ label, className, ...props }: DividerProps) {
  if (!label) return <div role="separator" className={cn('h-px w-full bg-border', className)} {...props} />
  return (
    <div role="separator" className={cn('flex items-center gap-3 text-xs text-fg-subtle', className)} {...props}>
      <span aria-hidden className="h-px flex-1 bg-border" />
      {label}
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  )
}

// ---------- AspectRatio ----------

export interface AspectRatioProps extends ComponentProps<'div'> {
  /** Ancho / alto: 16 / 9, 4 / 3, 1. */
  ratio?: number
}

/** Reserva el alto según el ancho (aspect-ratio nativo): imágenes y vídeos sin saltos de maquetación. */
export function AspectRatio({ ratio = 16 / 9, className, style, ...props }: AspectRatioProps) {
  return <div className={cn('relative w-full overflow-hidden [&>img]:size-full [&>img]:object-cover', className)} style={{ aspectRatio: ratio, ...style }} {...props} />
}
