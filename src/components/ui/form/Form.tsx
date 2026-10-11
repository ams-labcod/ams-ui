import type { ComponentProps, ReactNode } from 'react'
import {
  FormProvider,
  useController,
  useFormContext,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'
import { FormField, type FormFieldProps } from '../field/Field'

export interface FormProps<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  /** Resultado de useForm(); normalmente con zodResolver(schema). */
  form: UseFormReturn<T>
  /** Solo se llama si la validación pasa. */
  onSubmit: SubmitHandler<T>
}

// noValidate: los mensajes los pone el esquema, no el navegador.
export function Form<T extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

export interface FormItemProps<T extends FieldValues, N extends FieldPath<T>> extends Omit<FormFieldProps, 'children' | 'error'> {
  name: N
  /** Recibe value, onChange, onBlur, name y ref para conectarlos al control. */
  children: (field: ControllerRenderProps<T, N>) => ReactNode
}

/** Un FormField conectado a react-hook-form: el error sale del esquema. */
export function FormItem<T extends FieldValues = FieldValues, N extends FieldPath<T> = FieldPath<T>>({ name, children, ...fieldProps }: FormItemProps<T, N>) {
  const { control } = useFormContext<T>()
  const { field, fieldState } = useController({ name, control })
  return (
    <FormField {...fieldProps} disabled={fieldProps.disabled ?? field.disabled} error={fieldState.error?.message}>
      {children(field)}
    </FormField>
  )
}
