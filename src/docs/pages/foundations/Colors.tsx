import { useLayoutEffect, useRef, useState } from 'react'
import { CodeBlock, Code, DocHeader, DocSection, SpecTable } from '../../kit'

interface Token {
  /** Utilidad de Tailwind que lo aplica. */
  name: string
  /** Variable CSS de la que se lee el valor. */
  cssVar: string
  use: string
}

const surfaces: Token[] = [
  { name: 'bg-bg', cssVar: '--ams-bg', use: 'Fondo de la página' },
  { name: 'bg-surface', cssVar: '--ams-surface', use: 'Menús, popovers y diálogos que necesitan fondo opaco' },
  { name: 'bg-glass', cssVar: '--ams-glass', use: 'Tarjetas y paneles (utilidad glass)' },
  { name: 'bg-glass-strong', cssVar: '--ams-glass-strong', use: 'Navegación y paneles destacados (glass-strong)' },
  { name: 'bg-sunken', cssVar: '--ams-sunken', use: 'Campos, celdas y pozos dentro de una tarjeta' },
  { name: 'bg-hover', cssVar: '--ams-hover', use: 'Fondo al pasar el puntero en ítems neutros' },
]
const text: Token[] = [
  { name: 'text-fg', cssVar: '--ams-fg', use: 'Texto principal y títulos' },
  { name: 'text-fg-muted', cssVar: '--ams-fg-muted', use: 'Párrafos secundarios y descripciones' },
  { name: 'text-fg-subtle', cssVar: '--ams-fg-subtle', use: 'Metadatos, marcadores de posición y leyendas' },
  { name: 'text-accent', cssVar: '--ams-accent', use: 'Texto e iconos turquesa: enlaces, ítem activo' },
]
const lines: Token[] = [
  { name: 'border-border', cssVar: '--ams-border', use: 'Bordes y separadores' },
  { name: 'border-border-strong', cssVar: '--ams-border-strong', use: 'Bordes al pasar el puntero y de glass-strong' },
  { name: 'outline-ring', cssVar: '--ams-ring', use: 'Anillo de foco' },
  { name: 'bg-accent-soft', cssVar: '--ams-accent-soft', use: 'Fondo de ítems activos y seleccionados' },
  { name: 'border-accent-border', cssVar: '--ams-accent-border', use: 'Borde de ítems activos y seleccionados' },
]
const charts: Token[] = [
  { name: 'chart-1', cssVar: '--ams-chart-1', use: 'Serie 1: turquesa de marca' },
  { name: 'chart-2', cssVar: '--ams-chart-2', use: 'Serie 2: naranja' },
  { name: 'chart-3', cssVar: '--ams-chart-3', use: 'Serie 3: azul' },
  { name: 'chart-4', cssVar: '--ams-chart-4', use: 'Serie 4: magenta' },
  { name: 'chart-5', cssVar: '--ams-chart-5', use: 'Serie 5: violeta' },
]
const brand = [
  { name: 'teal-300', hex: '#5FD4C8', use: 'Inicio del degradado primario; acento en oscuro' },
  { name: 'teal-400', hex: '#4DB6AC', use: 'Turquesa de marca (primary)' },
  { name: 'teal-500', hex: '#2E9E94', use: 'Final del degradado primario' },
  { name: 'teal-700', hex: '#1A7068', use: 'Derivado: acento legible sobre fondos claros' },
  { name: 'navy-700', hex: '#2C3E50', use: 'Azul marino del isotipo' },
  { name: 'navy-800', hex: '#1E2936', use: 'Superficie profunda' },
  { name: 'navy-900', hex: '#142030', use: 'Superficie intermedia' },
  { name: 'navy-950', hex: '#0D1620', use: 'Fondo oscuro y texto sobre primary' },
]
const semantic = [
  { name: 'info', use: 'Información neutra, novedades' },
  { name: 'success', use: 'Operación completada, valores correctos' },
  { name: 'warning', use: 'Pendiente, requiere atención' },
  { name: 'danger', use: 'Error, acción destructiva' },
] as const

function Chip({ theme, cssVar }: { theme: 'dark' | 'light'; cssVar: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState('')
  // Lee el valor real del CSS: la documentación no puede desincronizarse de los tokens.
  useLayoutEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim())
  }, [cssVar])
  return (
    <span data-theme={theme} className="flex items-center gap-2.5 rounded-sm bg-bg px-2 py-1">
      <span ref={ref} className="size-8 shrink-0 rounded-sm border border-border bg-bg">
        <span className="block size-full rounded-[7px]" style={{ background: `var(${cssVar})` }} />
      </span>
      <span className="font-mono text-2xs break-all text-fg-subtle">{value}</span>
    </span>
  )
}

function TokenTable({ tokens }: { tokens: Token[] }) {
  return (
    <SpecTable
      head={['Token', 'Uso', 'Oscuro', 'Claro']}
      rows={tokens.map((t) => [
        <code className="font-mono text-xs whitespace-nowrap">{t.name}</code>,
        t.use,
        <Chip theme="dark" cssVar={t.cssVar} />,
        <Chip theme="light" cssVar={t.cssVar} />,
      ])}
    />
  )
}

export default function Colors() {
  return (
    <>
      <DocHeader
        title="Color"
        status="stable"
        since="v0.1"
        description="Azul marino profundo con un único acento turquesa. El color de marca se reserva para acciones, selección y foco; el resto de la interfaz se construye con capas de vidrio y tres niveles de texto."
      />

      <DocSection
        title="Cómo se usan"
        description="Usa siempre utilidades semánticas: cambian solas con el tema. Los valores turquesa y marino fijos existen para casos de marca, no para la interfaz."
      >
        <CodeBlock code={`<div className="glass rounded-lg p-6">
  <h3 className="text-fg">Asistencia</h3>
  <p className="text-fg-muted">312 presentes</p>
  <span className="text-accent">94 %</span>
</div>`} />
      </DocSection>

      <DocSection title="Superficies" description="El fondo lleva la aurora; encima, las tarjetas son vidrio translúcido. Dentro de una tarjeta, los campos y celdas se hunden con sunken.">
        <TokenTable tokens={surfaces} />
      </DocSection>

      <DocSection title="Texto" description="Tres niveles y un acento. Todos superan 4,5:1 sobre el fondo y sobre el vidrio en ambos temas.">
        <TokenTable tokens={text} />
      </DocSection>

      <DocSection title="Bordes, foco y selección">
        <TokenTable tokens={lines} />
      </DocSection>

      <DocSection
        title="Marca"
        description="Paleta fija, igual en los dos temas. El botón primario usa el degradado de teal-300 a teal-500 con texto navy-950 (5,6:1 en su punto más oscuro)."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brand.map((c) => (
            <figure key={c.name} className="overflow-hidden rounded-md border border-border">
              <div className="h-16" style={{ background: c.hex }} />
              <figcaption className="p-3">
                <code className="block font-mono text-xs text-fg">{c.name}</code>
                <span className="font-mono text-2xs text-fg-subtle">{c.hex}</span>
                <p className="mt-1 text-xs text-fg-muted">{c.use}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex h-14 items-center justify-center rounded-md bg-gradient-primary text-sm font-semibold text-on-primary shadow-glow">
          bg-gradient-primary · text-on-primary
        </div>
      </DocSection>

      <DocSection
        title="Semánticos"
        description={<>Cada uno tiene tres tokens: <Code>-</Code> para texto e icono, <Code>-soft</Code> para el fondo y <Code>-border</Code> para el borde. Danger no existía en la referencia y se definió con la misma lógica.</>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {(['dark', 'light'] as const).map((t) => (
            <div key={t} data-theme={t} className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-4 text-fg">
              <span className="mb-1 text-xs text-fg-subtle">Tema {t === 'dark' ? 'oscuro' : 'claro'}</span>
              {semantic.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between gap-3 rounded-sm border px-3 py-2 text-sm"
                  style={{ color: `var(--ams-${s.name})`, background: `var(--ams-${s.name}-soft)`, borderColor: `var(--ams-${s.name}-border)` }}
                >
                  <code className="font-mono text-xs">{s.name}</code>
                  <span className="text-xs">{s.use}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Gráficos"
        description="Cinco tonos en orden fijo: la serie N siempre usa chart-N. Validados con simulación de daltonismo (ΔE ≥ 12 entre vecinos), luminosidad y contraste ≥ 3:1, por separado para cada tema."
      >
        <TokenTable tokens={charts} />
      </DocSection>

      <DocSection title="Contraste" description="Relación de contraste WCAG del texto sobre el fondo de página. Objetivo: 4,5:1 para texto normal.">
        <SpecTable
          head={['Par', 'Oscuro', 'Claro']}
          rows={[
            ['fg / bg', '15,6:1', '16,8:1'],
            ['fg-muted / bg', '9,0:1', '8,1:1'],
            ['fg-subtle / bg', '5,9:1', '5,0:1'],
            ['fg-subtle / vidrio', '4,8:1', '5,5:1'],
            ['accent / bg', '10,2:1', '5,4:1'],
            ['on-primary / teal-500', '5,6:1', '5,6:1'],
            ['info, success, warning, danger', '8,3–12,9:1', '6,6–7,1:1 (5,0:1 o más sobre su fondo suave)'],
          ]}
        />
        <p className="mt-3 max-w-prose text-xs text-fg-subtle">
          El gris tenue original (#7D8B9D) daba 4,4:1 sobre vidrio; se aclaró a #8594A6 para cumplir AA.
        </p>
      </DocSection>
    </>
  )
}
