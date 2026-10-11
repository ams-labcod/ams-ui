import { cn } from '../../../lib/cn'

const sizes = { sm: 'size-4', md: 'size-5', lg: 'size-8' } as const

export interface SpinnerProps {
  size?: keyof typeof sizes
  /** Texto para lectores de pantalla. Sin él, el spinner es decorativo (lo anuncia su contenedor). */
  label?: string
  className?: string
}

export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('inline-block shrink-0 text-accent', sizes[size], className)}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  )
}
