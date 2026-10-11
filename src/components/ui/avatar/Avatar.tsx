import { useState, type ComponentProps } from 'react'
import { cn } from '../../../lib/cn'

const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-14 text-xl' } as const

/** "Ana María Pérez" → "AP". */
export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export interface AvatarProps extends Omit<ComponentProps<'span'>, 'children'> {
  /** Nombre de la persona: da el texto alternativo y las iniciales de respaldo. */
  name: string
  src?: string
  size?: keyof typeof sizes
}

export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const showImage = src && src !== failedSrc
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-primary font-display font-bold text-on-primary select-none',
        sizes[size],
        className,
      )}
      {...props}
    >
      {showImage ? (
        <img src={src} alt="" onError={() => setFailedSrc(src)} className="size-full object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </span>
  )
}
