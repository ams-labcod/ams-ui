import type { ComponentProps } from 'react'
import { Slot } from 'radix-ui'
import { cn } from '../../../lib/cn'
import { Spinner } from '../spinner/Spinner'

const variants = {
  primary: 'bg-gradient-primary text-on-primary shadow-glow hover:-translate-y-px hover:shadow-glow-lg active:translate-y-0',
  secondary: 'border border-border bg-glass text-fg backdrop-blur-md hover:border-border-strong hover:bg-glass-strong',
  outline: 'border border-accent-border text-accent hover:bg-accent-soft',
  ghost: 'text-fg-muted hover:bg-hover hover:text-fg',
  destructive: 'bg-danger text-on-danger hover:-translate-y-px hover:brightness-110 active:translate-y-0',
  link: 'h-auto px-0 text-accent underline-offset-4 hover:underline',
} as const

const sizes = {
  sm: 'h-control-sm px-4 text-[13px]',
  md: 'h-control-md px-5.5 text-sm',
  lg: 'h-control-lg px-7 text-[15px]',
  icon: 'size-control-md',
  'icon-sm': 'size-control-sm',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export function buttonClass({ variant = 'primary', size = 'md', className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    'group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,box-shadow,translate,filter] duration-(--duration-base)',
    'disabled:state-disabled aria-disabled:state-disabled [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0',
    sizes[size],
    variants[variant],
    className,
  )
}

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Muestra un spinner, bloquea el botón y lo marca como ocupado (aria-busy). */
  loading?: boolean
  /** Aplica los estilos al hijo (p. ej. un <a>) en vez de renderizar un <button>. */
  asChild?: boolean
}

export function Button({ variant, size, loading = false, asChild = false, className, children, disabled, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  const blocked = disabled || loading
  return (
    <Comp
      type={asChild ? undefined : (type ?? 'button')}
      disabled={asChild ? undefined : blocked}
      aria-disabled={asChild && blocked ? true : undefined}
      aria-busy={loading || undefined}
      className={buttonClass({ variant, size, className })}
      {...props}
    >
      {loading && <Spinner size="sm" className="text-current" />}
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}
