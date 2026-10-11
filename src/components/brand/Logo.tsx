import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import logoSrc from '../../assets/logo.png'

const sizes = {
  sm: { mark: 'size-7 rounded-[8px]', name: 'text-base', sub: 'text-[10px]' },
  md: { mark: 'size-9 rounded-[10px]', name: 'text-lg', sub: 'text-2xs' },
  lg: { mark: 'size-14 rounded-[14px]', name: 'text-2xl', sub: 'text-xs' },
} as const

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof sizes
  /** Muestra "AMS" y el subtítulo junto al isotipo. */
  wordmark?: boolean
  subtitle?: string
}

export function Logo({ size = 'md', wordmark = true, subtitle = 'Academic Manager', className, ...props }: LogoProps) {
  const s = sizes[size]
  return (
    <span className={cn('inline-flex items-center gap-3', className)} {...props}>
      <img
        src={logoSrc}
        alt={wordmark ? '' : 'AMS'}
        className={cn(s.mark, 'shrink-0 shadow-[0_4px_12px_rgb(77_182_172/0.25)]')}
      />
      {wordmark && (
        <span className={cn('font-display font-semibold leading-tight tracking-[-0.01em] text-fg', s.name)}>
          AMS{' '}
          {subtitle && (
            <small className={cn('block font-sans font-normal uppercase tracking-[0.04em] text-fg-subtle', s.sub)}>
              {subtitle}
            </small>
          )}
        </span>
      )}
    </span>
  )
}
