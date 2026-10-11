import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { buttonClass } from '../button/Button'

/**
 * Páginas a mostrar: siempre la primera y la última, la actual con `siblings`
 * vecinas a cada lado, y 'ellipsis' donde se saltan páginas.
 * paginationRange(6, 20) → [1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]
 */
export function paginationRange(page: number, total: number, siblings = 1): (number | 'ellipsis')[] {
  const slots = siblings * 2 + 5 // primera, última, actual, vecinas y dos saltos
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1)
  const left = Math.max(page - siblings, 2)
  const right = Math.min(page + siblings, total - 1)
  const showLeftGap = left > 3
  const showRightGap = right < total - 2
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
  if (!showLeftGap) return [...range(1, 3 + siblings * 2), 'ellipsis', total]
  if (!showRightGap) return [1, 'ellipsis', ...range(total - 2 - siblings * 2, total)]
  return [1, 'ellipsis', ...range(left, right), 'ellipsis', total]
}

export interface PaginationProps {
  /** Página actual, empezando en 1. */
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  /** Páginas vecinas visibles a cada lado de la actual. */
  siblings?: number
  className?: string
}

export function Pagination({ page, totalPages, onPageChange, siblings = 1, className }: PaginationProps) {
  if (totalPages <= 1) return null
  const item = (active: boolean) => buttonClass({ variant: active ? 'outline' : 'ghost', size: 'icon-sm', className: cn('tabular-nums', active && 'bg-accent-soft') })

  return (
    <nav aria-label="Paginación" className={className}>
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <button type="button" className={buttonClass({ variant: 'ghost', size: 'sm', className: 'px-3' })} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Página anterior">
            <ChevronLeft />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </li>
        {paginationRange(page, totalPages, siblings).map((p, i) =>
          p === 'ellipsis' ? (
            <li key={`e${i}`} aria-hidden className="inline-flex size-control-sm items-center justify-center text-fg-subtle">
              …
            </li>
          ) : (
            <li key={p}>
              <button type="button" className={item(p === page)} aria-current={p === page ? 'page' : undefined} aria-label={`Página ${p}`} onClick={() => onPageChange(p)}>
                {p}
              </button>
            </li>
          ),
        )}
        <li>
          <button type="button" className={buttonClass({ variant: 'ghost', size: 'sm', className: 'px-3' })} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Página siguiente">
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  )
}
