import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { controlClass, FieldDescription, FieldError } from '../field/Field'

export interface FloatingFieldProps extends Omit<ComponentProps<'input'>, 'placeholder'> {
  /** Etiqueta real (<label>): ocupa el lugar del placeholder y sube al enfocar o escribir. */
  label: string
  description?: ReactNode
  error?: ReactNode
}

// La etiqueta flota con CSS puro: el input lleva placeholder=" " y la etiqueta
// reacciona a :placeholder-shown (vacío) y :focus del input hermano.
export function FloatingField({ label, description, error, id, className, required, ...props }: FloatingFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="relative">
        <input
          id={inputId}
          placeholder=" "
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          className={cn(controlClass, 'peer h-control-lg pt-5 pb-1.5')}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'pointer-events-none absolute top-2 left-3.5 max-w-[calc(100%-1.75rem)] truncate text-xs text-fg-subtle',
            'transition-[top,translate,font-size,color] duration-(--duration-fast) ease-out-quint',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm',
            'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent',
            'peer-aria-invalid:text-danger peer-disabled:opacity-(--opacity-disabled)',
          )}
        >
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-danger">
              *
            </span>
          )}
        </label>
      </div>
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}
