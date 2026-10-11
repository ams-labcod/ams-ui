import type { ReactNode } from 'react'
import {
  Area,
  AreaChart as RAreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartFrame, ChartTooltipCard, chartColor, compactFormat, defaultFormat, type ChartSeries } from './ChartFrame'

type Row = Record<string, unknown>

export interface CartesianChartProps<T extends Row> {
  data: T[]
  /** Clave del eje X (mes, curso, fecha…). */
  index: keyof T & string
  series: ChartSeries[]
  title: string
  description?: ReactNode
  /** Formato de valores en tooltip y tabla. */
  valueFormatter?: (value: number) => string
  height?: number
  loading?: boolean
  empty?: ReactNode
  className?: string
}

// Ejes y rejilla recesivos: líneas finas del color de borde y texto tenue.
const axisTick = { fill: 'var(--ams-fg-subtle)', fontSize: 12 }
const grid = <CartesianGrid vertical={false} stroke="var(--ams-border)" />

function frameProps<T extends Row>(p: CartesianChartProps<T>) {
  const format = p.valueFormatter ?? defaultFormat
  return {
    title: p.title,
    description: p.description,
    height: p.height ?? 280,
    loading: p.loading,
    isEmpty: p.data.length === 0,
    empty: p.empty,
    className: p.className,
    legend: p.series.map((s, i) => ({ label: s.label, color: chartColor(i) })),
    table: {
      columns: ['', ...p.series.map((s) => s.label)],
      rows: p.data.map((d) => [String(d[p.index]), ...p.series.map((s) => format(Number(d[s.key])))]),
    },
  }
}

function tooltip(series: ChartSeries[], format: (n: number) => string, cursor: object | boolean) {
  return (
    <Tooltip
      cursor={cursor}
      isAnimationActive={false}
      content={({ active, payload, label }) =>
        active && payload ? (
          <ChartTooltipCard
            title={label as ReactNode}
            rows={series.map((s, i) => ({ label: s.label, color: chartColor(i), value: format(Number(payload.find((p) => p.dataKey === s.key)?.value ?? 0)) }))}
          />
        ) : null
      }
    />
  )
}

// Barras y áreas parten de 0 (representan cantidad); las líneas se ajustan a los datos (representan cambio).
function axes(index: string, domain: [number | string, number | string] = [0, 'auto']) {
  return [
    <XAxis key="x" dataKey={index} tick={axisTick} tickLine={false} axisLine={{ stroke: 'var(--ams-border-strong)' }} tickMargin={8} />,
    <YAxis key="y" domain={domain} tick={axisTick} tickLine={false} axisLine={false} tickFormatter={compactFormat} width={44} />,
  ]
}

export function LineChart<T extends Row>(props: CartesianChartProps<T>) {
  const format = props.valueFormatter ?? defaultFormat
  return (
    <ChartFrame {...frameProps(props)}>
      <ResponsiveContainer>
        <RLineChart data={props.data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          {grid}
          {axes(props.index, ['auto', 'auto'])}
          {tooltip(props.series, format, { stroke: 'var(--ams-border-strong)' })}
          {props.series.map((s, i) => (
            <Line
              key={s.key}
              dataKey={s.key}
              name={s.label}
              type="monotone"
              stroke={chartColor(i)}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, stroke: 'var(--ams-surface)', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export function AreaChart<T extends Row>(props: CartesianChartProps<T> & { stacked?: boolean }) {
  const format = props.valueFormatter ?? defaultFormat
  return (
    <ChartFrame {...frameProps(props)}>
      <ResponsiveContainer>
        <RAreaChart data={props.data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          {grid}
          {axes(props.index)}
          {tooltip(props.series, format, { stroke: 'var(--ams-border-strong)' })}
          {props.series.map((s, i) => (
            <Area
              key={s.key}
              dataKey={s.key}
              name={s.label}
              type="monotone"
              stackId={props.stacked ? 'stack' : undefined}
              stroke={chartColor(i)}
              strokeWidth={2}
              fill={chartColor(i)}
              fillOpacity={0.12}
              activeDot={{ r: 5, stroke: 'var(--ams-surface)', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          ))}
        </RAreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export function BarChart<T extends Row>(props: CartesianChartProps<T> & { stacked?: boolean }) {
  const format = props.valueFormatter ?? defaultFormat
  const last = props.series.length - 1
  return (
    <ChartFrame {...frameProps(props)}>
      <ResponsiveContainer>
        <RBarChart data={props.data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }} barGap={2}>
          {grid}
          {axes(props.index)}
          {tooltip(props.series, format, { fill: 'var(--ams-hover)' })}
          {props.series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              stackId={props.stacked ? 'stack' : undefined}
              fill={chartColor(i)}
              maxBarSize={24}
              // Extremo redondeado solo en la punta; en apiladas, solo en el segmento superior.
              radius={!props.stacked || i === last ? [4, 4, 0, 0] : 0}
              // Separación de 2 px del color de la superficie entre segmentos apilados.
              stroke={props.stacked ? 'var(--ams-surface)' : undefined}
              strokeWidth={props.stacked ? 2 : 0}
              isAnimationActive={false}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export interface DonutChartProps {
  data: { label: string; value: number }[]
  title: string
  description?: ReactNode
  valueFormatter?: (value: number) => string
  /** Formato del total del centro; usa uno compacto si las cifras son largas («$ 247,5 M»). */
  centerFormatter?: (value: number) => string
  /** Texto bajo el total, en el centro. */
  centerLabel?: string
  height?: number
  loading?: boolean
  empty?: ReactNode
  className?: string
}

/** Partes de un todo. Hasta 5 partes; agrupa el resto en «Otros». */
export function DonutChart({ data, title, description, valueFormatter = defaultFormat, centerFormatter = valueFormatter, centerLabel = 'Total', height = 240, loading, empty, className }: DonutChartProps) {
  const total = data.reduce((t, d) => t + d.value, 0)
  const pct = (v: number) => (total ? `${Math.round((v / total) * 100)} %` : '0 %')
  return (
    <ChartFrame
      title={title}
      description={description}
      height={height}
      loading={loading}
      isEmpty={data.length === 0 || total === 0}
      empty={empty}
      className={className}
      table={{ columns: ['', 'Valor', '%'], rows: data.map((d) => [d.label, valueFormatter(d.value), pct(d.value)]) }}
    >
      <div className="flex h-full flex-wrap items-center gap-6">
        <div className="relative aspect-square h-full">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip
                isAnimationActive={false}
                content={({ active, payload }) => {
                  const p = payload?.[0]
                  if (!active || !p) return null
                  const i = data.findIndex((d) => d.label === p.name)
                  return <ChartTooltipCard rows={[{ label: String(p.name), color: chartColor(i), value: `${valueFormatter(Number(p.value))} · ${pct(Number(p.value))}` }]} />
                }}
              />
              <Pie data={data} dataKey="value" nameKey="label" innerRadius="62%" outerRadius="92%" paddingAngle={1} cornerRadius={4} stroke="var(--ams-surface)" strokeWidth={2} isAnimationActive={false}>
                {data.map((d, i) => (
                  <Cell key={d.label} fill={chartColor(i)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-semibold text-fg">{centerFormatter(total)}</span>
            <span className="text-xs text-fg-subtle">{centerLabel}</span>
          </div>
        </div>
        {/* Etiquetas directas: con 5 partes o menos caben todas. */}
        <ul className="flex min-w-40 flex-col gap-2 text-sm">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2.5">
              <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: chartColor(i) }} />
              <span className="text-fg-muted">{d.label}</span>
              <span className="ml-auto pl-4 font-medium text-fg tabular-nums">{pct(d.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  )
}
