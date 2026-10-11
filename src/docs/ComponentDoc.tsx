// Plantilla de página de componente. Cada ejemplo es un archivo .tsx real:
// se renderiza y su código fuente se muestra tal cual (import ?raw), así que
// el código de la documentación no puede desincronizarse del que funciona.
import { useState, type ComponentType, type ReactNode } from 'react'
import { Input, Select, Switch, Tabs, TabsContent, TabsList, TabsTrigger, FormField } from '@ams/ui'
import { cn } from '../lib/cn'
import { CodeBlock, DocHeader, DocSection, DoDont, SpecTable } from './kit'
import { findEntry } from './registry'

export type ExampleMap = Map<string, { Component: ComponentType; code: string }>

/** Une los módulos y su código fuente, cargados con dos import.meta.glob del mismo patrón. */
export function loadExamples(modules: Record<string, unknown>, sources: Record<string, unknown>): ExampleMap {
  const map: ExampleMap = new Map()
  for (const [path, mod] of Object.entries(modules)) {
    const name = path.slice(path.lastIndexOf('/') + 1).replace(/\.tsx$/, '')
    map.set(name, { Component: (mod as { default: ComponentType }).default, code: String(sources[path]) })
  }
  return map
}

export interface ExampleSpec {
  name: string
  title: string
  description?: ReactNode
  /** Sustituye la disposición por defecto (centrado, en fila). */
  previewClassName?: string
}

export interface PropSpec {
  name: string
  type: string
  default?: string
  description: ReactNode
}

export interface ApiGroup {
  component: string
  props: PropSpec[]
  /** Atributos nativos o de Radix que también acepta. */
  extends?: ReactNode
}

interface ComponentDocProps {
  slug: string
  description: ReactNode
  importCode: string
  examples: ExampleMap
  sections: ExampleSpec[]
  playground?: ReactNode
  api: ApiGroup[]
  a11y: ReactNode[]
  dos: ReactNode[]
  donts: ReactNode[]
  limitations?: ReactNode[]
  /** Título de la sección de API: «Propiedades» en componentes, «API» en hooks. */
  apiTitle?: string
}

export function ComponentDoc({ slug, description, importCode, examples, sections, playground, api, a11y, dos, donts, limitations, apiTitle = 'Propiedades' }: ComponentDocProps) {
  const entry = findEntry(slug)
  return (
    <>
      <DocHeader title={entry?.title ?? slug} status={entry?.status} since={entry?.since} description={description} />
      <div className="mb-14">
        <CodeBlock code={importCode} label="Importación" />
      </div>

      {playground && (
        <DocSection title="Prueba" description="Cambia las propiedades y observa el resultado. El código se actualiza con cada cambio.">
          {playground}
        </DocSection>
      )}

      {sections.map((s) => {
        const ex = examples.get(s.name)
        if (!ex) throw new Error(`Falta el ejemplo «${s.name}» en ${slug}`)
        return (
          <DocSection key={s.name} title={s.title} description={s.description}>
            <ExampleView example={ex} className={s.previewClassName} />
          </DocSection>
        )
      })}

      <DocSection title={apiTitle}>
        <div className="flex flex-col gap-8">
          {api.map((g) => (
            <div key={g.component}>
              <h3 className="mb-3 font-mono text-sm text-fg">{`<${g.component}>`}</h3>
              <SpecTable
                head={['Prop', 'Tipo', 'Por defecto', 'Descripción']}
                rows={g.props.map((p) => [
                  <code className="font-mono text-xs whitespace-nowrap">{p.name}</code>,
                  <code className="font-mono text-xs text-accent">{p.type}</code>,
                  p.default ? <code className="font-mono text-xs">{p.default}</code> : '—',
                  p.description,
                ])}
              />
              {g.extends && <p className="mt-2 text-xs text-fg-subtle">{g.extends}</p>}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Accesibilidad">
        <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-sm text-fg-muted marker:text-accent">
          {a11y.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </DocSection>

      <DocSection title="Uso">
        <DoDont dos={dos} donts={donts} />
      </DocSection>

      {limitations && limitations.length > 0 && (
        <DocSection title="Limitaciones conocidas">
          <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-sm text-fg-muted marker:text-warning">
            {limitations.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </DocSection>
      )}
    </>
  )
}

export function ExampleView({ example, className }: { example: { Component: ComponentType; code: string }; className?: string }) {
  const { Component, code } = example
  return (
    <Tabs defaultValue="preview">
      <TabsList aria-label="Ver ejemplo">
        <TabsTrigger value="preview">Vista previa</TabsTrigger>
        <TabsTrigger value="code">Código</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-3">
        <div className={cn('flex min-h-36 flex-wrap items-center justify-center gap-3 rounded-lg border border-border p-6 sm:p-8', className)}>
          <Component />
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  )
}

// ---------- Playground ----------

type Values = Record<string, string | boolean>

export type Control =
  | { prop: string; label: string; type: 'select'; options: string[]; initial: string }
  | { prop: string; label: string; type: 'boolean'; initial: boolean }
  | { prop: string; label: string; type: 'text'; initial: string }

export function Playground({ controls, render, code }: { controls: Control[]; render: (v: Values) => ReactNode; code: (v: Values) => string }) {
  const [values, setValues] = useState<Values>(() => Object.fromEntries(controls.map((c) => [c.prop, c.initial])))
  const set = (prop: string, value: string | boolean) => setValues((v) => ({ ...v, [prop]: value }))

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="glass flex min-h-48 items-center justify-center rounded-lg p-8">{render(values)}</div>
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-sunken p-5">
          {controls.map((c) =>
            c.type === 'boolean' ? (
              <Switch key={c.prop} label={c.label} checked={values[c.prop] === true} onChange={(e) => set(c.prop, e.target.checked)} />
            ) : (
              <FormField key={c.prop} label={c.label}>
                {c.type === 'select' ? (
                  <Select value={String(values[c.prop])} onValueChange={(v) => set(c.prop, v)} options={c.options.map((o) => ({ value: o, label: o }))} />
                ) : (
                  <Input value={String(values[c.prop])} onChange={(e) => set(c.prop, e.target.value)} />
                )}
              </FormField>
            ),
          )}
        </div>
      </div>
      <CodeBlock code={code(values)} />
    </div>
  )
}

/** Genera JSX legible a partir de props, omitiendo las que coinciden con el valor por defecto. */
export function jsx(tag: string, props: Record<string, unknown>, defaults: Record<string, unknown>, children?: string) {
  const attrs = Object.entries(props)
    .filter(([k, v]) => v !== defaults[k] && v !== false && v !== undefined && v !== '')
    .map(([k, v]) => (v === true ? k : typeof v === 'string' ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`))
  const open = [tag, ...attrs].join(' ')
  return children ? `<${open}>${children}</${tag}>` : `<${open} />`
}

// ---------- Patrones ----------

interface PatternDocProps {
  slug: string
  description: ReactNode
  example: { Component: ComponentType; code: string }
  /** Componentes de la librería que usa, con su slug para enlazarlos. */
  uses: { slug: string; title: string }[]
  /** Decisiones del patrón: por qué está montado así. */
  notes: ReactNode[]
}

/** Página de patrón: una pantalla completa hecha solo con componentes de la librería. */
export function PatternDoc({ slug, description, example, uses, notes }: PatternDocProps) {
  const entry = findEntry(slug)
  return (
    <>
      <DocHeader title={entry?.title ?? slug} status={entry?.status} since={entry?.since} description={description} />
      <div className="mb-14">
        <ExampleView example={example} className="block p-3 sm:p-5" />
      </div>
      <DocSection title="Qué usa">
        <ul className="flex flex-wrap gap-2">
          {uses.map((u) => (
            <li key={u.slug}>
              <a href={`#/${u.slug}`} className="inline-flex rounded-full border border-border bg-glass px-3 py-1 text-sm text-fg-muted transition-colors hover:border-accent-border hover:text-accent">
                {u.title}
              </a>
            </li>
          ))}
        </ul>
      </DocSection>
      <DocSection title="Decisiones">
        <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-sm text-fg-muted marker:text-accent">
          {notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      </DocSection>
    </>
  )
}
