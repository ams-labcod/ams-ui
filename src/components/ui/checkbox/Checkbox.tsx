import { useId, useLayoutEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { mergeRefs } from '../../../lib/mergeRefs'
import { useFieldControl } from '../field/Field'

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  /** Texto al lado de la casilla. Sin él, nombra la casilla con aria-label o un FormField. */
  label?: ReactNode
  description?: ReactNode
  /** Estado mixto: parte de los elementos de un grupo están marcados. */
  indeterminate?: boolean
}

export function Checkbox({ label, description, indeterminate = false, className, ref, ...props }: CheckboxProps) {
  const inner = useRef<HTMLInputElement>(null)
  const descriptionId = useId()
  const control = useFieldControl(props)

  // indeterminate solo existe como propiedad del DOM (la leen los lectores de pantalla);
  // el aspecto cuelga de data-indeterminate, que va en el marcado desde el primer render.
  useLayoutEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate
  }, [indeterminate])

  const box = (
    <span className={cn('relative inline-flex size-4.5 shrink-0', label ? 'mt-0.5' : className)}>
      <input
        type="checkbox"
        ref={mergeRefs(inner, ref)}
        {...control}
        data-indeterminate={indeterminate || undefined}
        aria-describedby={[control['aria-describedby'], description && descriptionId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'peer size-full cursor-pointer appearance-none rounded-[5px] border border-border-strong bg-sunken transition-colors duration-(--duration-fast)',
          'hover:border-accent-border checked:border-primary checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary',
          'aria-invalid:border-danger disabled:state-disabled',
        )}
      />
      <Check aria-hidden strokeWidth={3} className="pointer-events-none absolute inset-0 m-auto size-3.5 text-on-primary opacity-0 peer-[:checked:not([data-indeterminate])]:opacity-100" />
      <Minus aria-hidden strokeWidth={3} className="pointer-events-none absolute inset-0 m-auto size-3.5 text-on-primary opacity-0 peer-data-indeterminate:opacity-100" />
    </span>
  )

  if (!label) return box
  return (
    <label className={cn('inline-flex cursor-pointer items-start gap-3 text-sm', control.disabled && 'state-disabled', className)}>
      {box}
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
