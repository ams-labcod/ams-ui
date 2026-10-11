import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { useFieldControl } from '../field/Field'

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'type' | 'role'> {
  /** Texto al lado del interruptor. Sin él, nómbralo con aria-label o un FormField. */
  label?: ReactNode
  description?: ReactNode
}

// Un checkbox nativo con role="switch": teclado (Espacio), formularios y
// aria-checked funcionan sin código propio.
export function Switch({ label, description, className, ...props }: SwitchProps) {
  const descriptionId = useId()
  const control = useFieldControl(props)

  const track = (
    <span className={cn('relative inline-flex h-6 w-10 shrink-0', label ? 'mt-[-1px]' : className)}>
      <input
        type="checkbox"
        role="switch"
        {...control}
        aria-describedby={[control['aria-describedby'], description && descriptionId].filter(Boolean).join(' ') || undefined}
        className="peer absolute inset-0 z-10 size-full cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed"
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none size-full rounded-full border border-border-strong bg-sunken transition-colors duration-(--duration-base)',
          'peer-checked:border-primary peer-checked:bg-primary peer-aria-invalid:border-danger peer-disabled:state-disabled',
          'peer-checked:[&>span]:translate-x-4.5 peer-checked:[&>span]:bg-white',
        )}
      >
        <span className="mt-0.5 block size-4.5 translate-x-0.5 rounded-full bg-fg-muted shadow-sm transition-[translate,background-color] duration-(--duration-base) ease-out-quint" />
      </span>
    </span>
  )

  if (!label) return track
  return (
    <label className={cn('inline-flex cursor-pointer items-start gap-3 text-sm', control.disabled && 'state-disabled', className)}>
      {track}
      <span>
        <span className="text-fg">{label}</span>
        {description && (
          <span id={descriptionId} className="mt-0.5 block text-xs text-fg-subtle">
            {description}
          </span>
        )}
      </span>
    </label>
  )
}
