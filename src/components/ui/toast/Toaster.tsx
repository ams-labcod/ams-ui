import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { alertVariants } from '../alert/Alert'
import { Button } from '../button/Button'
import { toast, useToasts, type ToastItem } from './toast'

const positions = {
  'bottom-right': 'right-4 bottom-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
} as const

export interface ToasterProps {
  position?: keyof typeof positions
  /** Cuántas notificaciones se ven a la vez; las más antiguas esperan. */
  visible?: number
}

/** Móntalo una vez, cerca de la raíz de la app. */
export function Toaster({ position = 'bottom-right', visible = 3 }: ToasterProps) {
  const toasts = useToasts()
  return (
    <section aria-label="Notificaciones" className={cn('pointer-events-none fixed z-(--z-toast) flex w-[calc(100%-2rem)] max-w-sm flex-col', positions[position])}>
      {/* Región viva estable: los lectores anuncian lo que se añade dentro. */}
      <ol aria-live="polite" className="flex w-full flex-col gap-2">
        {toasts.slice(-visible).map((t) => (
          <Toast key={t.id} item={t} />
        ))}
      </ol>
    </section>
  )
}

function Toast({ item }: { item: ToastItem }) {
  const { id, title, description, variant = 'info', duration = 5000, action } = item
  const [paused, setPaused] = useState(false)
  const v = alertVariants[variant]
  const Icon = v.icon

  // ponytail: al reanudar vuelve a contar la duración completa; guardar el tiempo restante si molesta.
  useEffect(() => {
    if (paused || duration === Infinity) return
    const timer = setTimeout(() => toast.dismiss(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, paused])

  return (
    <li
      role={variant === 'danger' ? 'alert' : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="pointer-events-auto flex gap-3 rounded-lg border border-border-strong bg-surface p-4 text-sm shadow-pop animate-toast-in"
    >
      <Icon aria-hidden className={cn('mt-0.5 size-4.5 shrink-0', v.tint)} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-fg">{title}</p>
        {description && <p className="mt-1 leading-relaxed text-fg-muted">{description}</p>}
        {action && (
          <Button
            size="sm"
            variant="secondary"
            className="mt-3"
            onClick={() => {
              action.onClick()
              toast.dismiss(id)
            }}
          >
            {action.label}
          </Button>
        )}
      </div>
      <button
        type="button"
        onClick={() => toast.dismiss(id)}
        aria-label="Cerrar notificación"
        className="-m-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-hover hover:text-fg"
      >
        <X className="size-4" />
      </button>
    </li>
  )
}
