import type { ComponentType, ReactNode } from 'react'
import { ChevronRight, Ellipsis } from 'lucide-react'
import { cn } from '../../../lib/cn'

export interface BreadcrumbItem {
  label: ReactNode
  /** Sin href, el ítem es texto (normalmente el último, la página actual). */
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Con más ítems, se colapsan los del medio en «…» (se mantienen el primero y los dos últimos). */
  maxItems?: number
  /** Componente de enlace del router (Link de react-router, Next…). Por defecto <a>. */
  linkComponent?: ComponentType<{ href: string; className?: string; children: ReactNode }>
  className?: string
}

const linkClass = 'rounded-sm text-fg-muted transition-colors duration-(--duration-fast) hover:text-accent'

export function Breadcrumb({ items, maxItems = 4, linkComponent: Link = DefaultLink, className }: BreadcrumbProps) {
  const collapsed = items.length > maxItems
  const visible: (BreadcrumbItem | 'ellipsis')[] = collapsed ? [items[0]!, 'ellipsis', ...items.slice(-2)] : items
  const hidden = collapsed ? items.slice(1, -2) : []

  return (
    <nav aria-label="Ruta de navegación" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {visible.map((item, i) => {
          const last = i === visible.length - 1
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {item === 'ellipsis' ? (
                <span title={hidden.map((h) => (typeof h.label === 'string' ? h.label : '')).join(' / ')} className="inline-flex text-fg-subtle">
                  <Ellipsis aria-hidden className="size-4" />
                  <span className="sr-only">{hidden.length} niveles intermedios</span>
                </span>
              ) : last || !item.href ? (
                <span aria-current={last ? 'page' : undefined} className={cn(last ? 'font-medium text-fg' : 'text-fg-muted')}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 text-fg-subtle" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function DefaultLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
