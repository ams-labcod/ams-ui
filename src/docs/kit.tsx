// Piezas de la documentación (no forman parte del API público).
// Usan los componentes de la librería siempre que existen.
import { useState, type ReactNode } from 'react'
import { Check, Copy, X } from 'lucide-react'
import { Badge, Button, type BadgeVariant } from '@juanarenas312002/ams-ui'
import { cn } from '../lib/cn'
import type { Status, Version } from './registry'

const statusStyle: Record<Status, { label: string; variant: BadgeVariant }> = {
  stable: { label: 'Estable', variant: 'success' },
  beta: { label: 'Beta', variant: 'info' },
  experimental: { label: 'Experimental', variant: 'warning' },
  planned: { label: 'Planificado', variant: 'neutral' },
}

export function StatusPill({ status, since }: { status: Status; since?: Version }) {
  const s = statusStyle[status]
  return (
    <Badge variant={s.variant}>
      {s.label}
      {since && <span className="font-normal">{since}</span>}
    </Badge>
  )
}

export function DocHeader({ title, description, status, since }: { title: string; description: ReactNode; status?: Status; since?: Version }) {
  return (
    <header className="mb-10">
      {status && <StatusPill status={status} since={since} />}
      <h1 className="mt-4 font-display text-h1 font-semibold text-balance">{title}</h1>
      <p className="mt-4 max-w-prose text-lead text-pretty text-fg-muted">{description}</p>
    </header>
  )
}

export function DocSection({ title, description, children }: { title: string; description?: ReactNode; children: ReactNode }) {
  const id = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\W+/g, '-')
  return (
    <section aria-labelledby={id} className="mt-14 first-of-type:mt-0">
      <h2 id={id} className="font-display text-h2 font-semibold">{title}</h2>
      {description && <p className="mt-2 max-w-prose text-sm text-pretty text-fg-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('glass rounded-lg p-6', className)}>{children}</div>
}

export function CodeBlock({ code, label = 'Código' }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Sin permiso de portapapeles: el código sigue seleccionable a mano.
    }
  }
  return (
    <div className="relative mt-4 rounded-md border border-border bg-sunken">
      <Button variant="ghost" size="icon-sm" onClick={copy} aria-label={copied ? 'Copiado' : `Copiar ${label.toLowerCase()}`} className="absolute top-1.5 right-1.5">
        {copied ? <Check className="text-accent" /> : <Copy />}
      </Button>
      <pre tabIndex={0} role="region" aria-label={label} className="max-h-[32rem] overflow-auto p-4 pr-12 font-mono text-[13px] leading-relaxed text-fg-muted">
        <code>{code.trim()}</code>
      </pre>
      <span className="sr-only" aria-live="polite">{copied ? 'Código copiado' : ''}</span>
    </div>
  )
}

/** Tabla de especificaciones (tokens, props). */
export function SpecTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-sunken text-fg-subtle">
          <tr>{head.map((h) => <th key={h} scope="col" className="px-4 py-2.5 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((c, j) => <td key={j} className={cn('px-4 py-2.5 align-top', j === 0 ? 'text-fg' : 'text-fg-muted')}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Recomendaciones en dos columnas: qué hacer y qué evitar. */
export function DoDont({ dos, donts }: { dos: ReactNode[]; donts: ReactNode[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ul aria-label="Recomendado" className="flex flex-col gap-3 rounded-lg border border-success-border bg-success-soft p-5">
        {dos.map((d, i) => (
          <li key={i} className="flex gap-3 text-sm text-fg">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <ul aria-label="Evitar" className="flex flex-col gap-3 rounded-lg border border-danger-border bg-danger-soft p-5">
        {donts.map((d, i) => (
          <li key={i} className="flex gap-3 text-sm text-fg">
            <X aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded-xs bg-sunken px-1.5 py-0.5 font-mono text-[0.85em] text-fg">{children}</code>
)
