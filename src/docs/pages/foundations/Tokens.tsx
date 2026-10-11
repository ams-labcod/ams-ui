import { useState } from 'react'
import { Code, CodeBlock, DocHeader, DocSection, Preview, SpecTable } from '../../kit'
import { cn } from '../../../lib/cn'

const radii = [
  { cls: 'rounded-xs', px: '6 px', use: 'Celdas, días del calendario, kbd' },
  { cls: 'rounded-sm', px: '8 px', use: 'Ítems de menú, filas, chips de valor' },
  { cls: 'rounded-md', px: '12 px', use: 'Popovers, acordeones, bloques de código' },
  { cls: 'rounded-lg', px: '18 px', use: 'Tarjetas' },
  { cls: 'rounded-xl', px: '28 px', use: 'Diálogos y paneles grandes' },
  { cls: 'rounded-full', px: 'píldora', use: 'Botones, campos de una línea, navegación, badges' },
]
const shadows = [
  { cls: 'shadow-glass', use: 'Vidrio: sombra amplia y brillo interior en el borde superior' },
  { cls: 'shadow-pop', use: 'Overlays flotantes: menús, popovers, diálogos' },
  { cls: 'shadow-glow', use: 'Botón primario en reposo' },
  { cls: 'shadow-glow-lg', use: 'Botón primario al pasar el puntero' },
]
const controls = [
  { cls: 'h-control-sm', px: '36 px', use: 'Barras compactas, filtros, botones de icono' },
  { cls: 'h-control-md', px: '44 px', use: 'Tamaño por defecto; cumple el mínimo táctil de 44 px' },
  { cls: 'h-control-lg', px: '52 px', use: 'Llamadas a la acción principales' },
]
const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24]

export default function Tokens() {
  const [played, setPlayed] = useState(0)

  return (
    <>
      <DocHeader
        title="Tokens"
        status="stable"
        since="v0.1"
        description={<>Todos los valores visuales de la librería salen de <Code>src/styles/tokens.css</Code>. Los componentes los consumen como utilidades de Tailwind, así que cambiar un token cambia todos los componentes a la vez.</>}
      />

      <DocSection title="Vidrio" description="El material de la marca. Úsalo en tarjetas, navegación y overlays. En tablas y listas largas usa superficies sólidas: el desenfoque es caro de pintar.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-lg p-6">
            <code className="font-mono text-xs text-accent">glass</code>
            <p className="mt-2 text-sm text-fg-muted">Fondo al 6 %, desenfoque de 20 px y borde sutil. Tarjetas y paneles.</p>
          </div>
          <div className="glass-strong rounded-lg p-6">
            <code className="font-mono text-xs text-accent">glass-strong</code>
            <p className="mt-2 text-sm text-fg-muted">Fondo al 10 %, desenfoque de 28 px y borde más visible. Navegación y paneles destacados.</p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Radios" description="El radio crece con el tamaño del elemento. Las acciones son píldoras, igual que en la referencia.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {radii.map((r) => (
            <div key={r.cls} className="flex flex-col gap-3">
              <div className={cn('h-20 border border-accent-border bg-accent-soft', r.cls)} />
              <div>
                <code className="font-mono text-xs text-fg">{r.cls}</code>
                <span className="ml-2 text-xs text-fg-subtle">{r.px}</span>
                <p className="mt-0.5 text-xs text-fg-muted">{r.use}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Sombras" description="Cada sombra indica a qué altura está el elemento. El brillo turquesa se reserva para la acción primaria.">
        <div className="grid gap-6 sm:grid-cols-2">
          {shadows.map((s) => (
            <div key={s.cls} className={cn('rounded-lg border border-border bg-surface p-5', s.cls)}>
              <code className="font-mono text-xs text-fg">{s.cls}</code>
              <p className="mt-1 text-xs text-fg-muted">{s.use}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Alturas de control" description="Botones, campos y selects comparten altura para alinearse en una misma fila.">
        <Preview className="flex flex-wrap items-end gap-4">
          {controls.map((c) => (
            <div key={c.cls} className="flex flex-col items-start gap-2">
              <div className={cn('flex w-32 items-center justify-center rounded-full border border-accent-border bg-accent-soft font-mono text-xs text-accent', c.cls)}>{c.px}</div>
              <code className="font-mono text-xs text-fg-subtle">{c.cls}</code>
            </div>
          ))}
        </Preview>
        <SpecTable head={['Token', 'Altura', 'Uso']} rows={controls.map((c) => [<code className="font-mono text-xs">{c.cls}</code>, c.px, c.use])} />
      </DocSection>

      <DocSection title="Espaciado" description={<>Escala de Tailwind en pasos de 4 px. Separación entre tarjetas: <Code>gap-4.5</Code> (18 px), como en la referencia. Relleno de tarjeta: <Code>p-7</Code> (28 px).</>}>
        <div className="flex flex-col gap-2">
          {spacing.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <code className="w-10 font-mono text-xs text-fg-subtle">{n}</code>
              <div className="h-3 rounded-full bg-primary" style={{ width: n * 4 }} />
              <span className="text-xs text-fg-muted">{n * 4} px</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Movimiento" description="Transiciones cortas que responden a una acción. Con «reducir movimiento» activado en el sistema se desactivan todas las animaciones.">
        <SpecTable
          head={['Token', 'Valor', 'Uso']}
          rows={[
            [<Code>--duration-fast</Code>, '150 ms', 'Color y fondo al pasar el puntero'],
            [<Code>--duration-base</Code>, '200 ms', 'Aparición de menús y tooltips'],
            [<Code>--duration-slow</Code>, '300 ms', 'Diálogos, paneles laterales, acordeones'],
            [<Code>ease-out-quint</Code>, 'cubic-bezier(.22, 1, .36, 1)', 'Entradas: arranca rápido y frena suave'],
            [<Code>animate-overlay-in</Code>, '220 ms', 'Entrada de overlays'],
          ]}
        />
        <Preview className="mt-4 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setPlayed((n) => n + 1)}
            className="h-control-sm rounded-full border border-border px-4 text-sm font-medium text-fg hover:bg-hover"
          >
            Reproducir entrada
          </button>
          <div key={played} className="glass animate-overlay-in rounded-md px-4 py-3 text-sm text-fg-muted">
            Menú abierto
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Foco" description="Anillo de 2 px en el color ring, separado 2 px del borde. Aparece solo al navegar con teclado (:focus-visible). Prueba con Tab:">
        <Preview className="flex flex-wrap gap-3">
          {['Primero', 'Segundo', 'Tercero'].map((l) => (
            <button key={l} type="button" className="h-control-sm rounded-full border border-border px-4 text-sm text-fg">{l}</button>
          ))}
        </Preview>
      </DocSection>

      <DocSection title="Capas" description={<>Se aplican con <Code>z-(--z-modal)</Code>. Un overlay siempre queda por encima de la navegación fija.</>}>
        <SpecTable
          head={['Token', 'Valor', 'Uso']}
          rows={[
            [<Code>--z-sticky</Code>, '100', 'Navegación fija'],
            [<Code>--z-overlay</Code>, '200', 'Fondo oscurecido de diálogos'],
            [<Code>--z-modal</Code>, '210', 'Diálogos y paneles laterales'],
            [<Code>--z-popover</Code>, '300', 'Menús, popovers, selects'],
            [<Code>--z-toast</Code>, '400', 'Notificaciones'],
            [<Code>--z-tooltip</Code>, '500', 'Tooltips'],
          ]}
        />
      </DocSection>

      <DocSection title="Puntos de corte" description="Los mismos de la referencia: a 880 px la navegación y las grillas pasan a una columna.">
        <SpecTable
          head={['Prefijo', 'Desde', 'Qué cambia']}
          rows={[
            [<Code>sm:</Code>, '640 px', 'Detalles secundarios visibles'],
            [<Code>md:</Code>, '880 px', 'Navegación completa y grillas de 2–3 columnas'],
            [<Code>lg:</Code>, '980 px', 'Diseños a dos columnas (hero, paneles)'],
            [<Code>xl:</Code>, '1240 px', 'Ancho máximo del contenedor (max-w-page)'],
          ]}
        />
      </DocSection>

      <DocSection title="Estado deshabilitado">
        <p className="max-w-prose text-sm text-fg-muted">
          <Code>state-disabled</Code> aplica <Code>--opacity-disabled</Code> (0,5) y bloquea el puntero. Los componentes lo usan con <Code>disabled:state-disabled</Code> y lo acompañan del atributo <Code>disabled</Code> o <Code>aria-disabled</Code>, para que los lectores de pantalla también lo anuncien.
        </p>
        <CodeBlock code={`<button disabled className="... disabled:state-disabled">Guardar</button>`} />
      </DocSection>
    </>
  )
}
