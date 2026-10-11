import { createContext, useContext, useId, type AriaAttributes, type ComponentProps, type ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '../../../lib/cn'

interface FieldContextValue {
  id: string
  describedBy?: string
  invalid: boolean
  required?: boolean
  disabled?: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

interface ControlProps {
  id?: string
  disabled?: boolean
  required?: boolean
  'aria-describedby'?: string
  'aria-invalid'?: AriaAttributes['aria-invalid']
}

/** Conecta un control con el FormField que lo rodea: id, descripción, error, requerido y deshabilitado. */
export function useFieldControl<P extends ControlProps>(props: P): P {
  const field = useContext(FieldContext)
  if (!field) return props
  const describedBy = [field.describedBy, props['aria-describedby']].filter(Boolean).join(' ') || undefined
  return {
    ...props,
    id: props.id ?? field.id,
    disabled: props.disabled ?? field.disabled,
    required: props.required ?? field.required,
    'aria-describedby': describedBy,
    'aria-invalid': props['aria-invalid'] ?? (field.invalid || undefined),
  }
}

/** Estilos compartidos por Input, Textarea y el disparador de Select. */
export const controlClass = cn(
  'w-full rounded-md border border-border bg-sunken px-3.5 text-sm text-fg placeholder:text-fg-subtle',
  'transition-colors duration-(--duration-fast) hover:border-border-strong focus-visible:border-accent-border',
  'aria-invalid:border-danger-border aria-invalid:outline-danger disabled:state-disabled',
)

export interface LabelProps extends ComponentProps<'label'> {
  required?: boolean
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm font-medium text-fg', className)} {...props}>
      {children}
      {required && (
        <span aria-hidden className="ml-0.5 text-danger">
          *
        </span>
      )}
    </label>
  )
}

/** Texto de ayuda bajo un control. Enlázalo con aria-describedby si no usas FormField. */
export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-xs text-fg-subtle', className)} {...props} />
}

/** Mensaje de error bajo un control, con icono. */
export function FieldError({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs font-medium text-danger', className)} {...props}>
      <CircleAlert aria-hidden className="size-3.5 shrink-0" />
      {children}
    </p>
  )
}

export interface FormFieldProps {
  label: ReactNode
  /** Ayuda bajo el control. Sigue visible cuando hay error. */
  description?: ReactNode
  /** Mensaje de error. Si existe, el control se marca como inválido. */
  error?: ReactNode
  required?: boolean
  disabled?: boolean
  /** id del control; si no se pasa se genera uno. */
  id?: string
  className?: string
  children: ReactNode
}

export function FormField({ label, description, error, required, disabled, id, className, children }: FormFieldProps) {
  const autoId = useId()
  const controlId = id ?? autoId
  const descriptionId = description ? `${controlId}-description` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const value: FieldContextValue = {
    id: controlId,
    describedBy: [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
    invalid: Boolean(error),
    required,
    disabled,
  }
  return (
    <FieldContext.Provider value={value}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        <Label htmlFor={controlId} required={required} className={cn(disabled && 'opacity-(--opacity-disabled)')}>
          {label}
        </Label>
        {children}
        {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    </FieldContext.Provider>
  )
}
