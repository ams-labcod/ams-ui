import type { ComponentProps, ReactNode } from 'react'
import { AlertDialog as A } from 'radix-ui'
import { cn } from '../../../lib/cn'
import { buttonClass, type ButtonVariant } from '../button/Button'

export const AlertDialog = A.Root
export const AlertDialogTrigger = A.Trigger

export interface AlertDialogContentProps extends Omit<ComponentProps<typeof A.Content>, 'title'> {
  /** La pregunta: «¿Eliminar el período 1?». */
  title: ReactNode
  /** La consecuencia, obligatoria: es lo que la persona tiene que entender antes de decidir. */
  description: ReactNode
}

// A diferencia de Dialog: no se cierra con clic fuera ni tiene X. Hay que decidir.
export function AlertDialogContent({ title, description, className, children, ...props }: AlertDialogContentProps) {
  return (
    <A.Portal>
      <A.Overlay className="fixed inset-0 z-(--z-overlay) bg-navy-950/60 backdrop-blur-sm animate-fade-in" />
      <A.Content
        className={cn(
          'fixed top-1/2 left-1/2 z-(--z-modal) w-[calc(100%-2rem)] max-w-md -translate-1/2 rounded-xl border border-border-strong bg-surface p-6 text-fg shadow-pop outline-none animate-overlay-in sm:p-7',
          className,
        )}
        {...props}
      >
        <A.Title className="font-display text-h2 font-semibold text-balance">{title}</A.Title>
        <A.Description className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</A.Description>
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>
      </A.Content>
    </A.Portal>
  )
}

/** Botón que cancela. Recibe el foco al abrir: la opción segura es la predeterminada. */
export function AlertDialogCancel({ className, children = 'Cancelar', ...props }: ComponentProps<typeof A.Cancel>) {
  return (
    <A.Cancel className={buttonClass({ variant: 'ghost', className })} {...props}>
      {children}
    </A.Cancel>
  )
}

export interface AlertDialogActionProps extends ComponentProps<typeof A.Action> {
  variant?: ButtonVariant
}

/** Botón que confirma. Por defecto destructive: si no lo fuera, probablemente no necesitas un AlertDialog. */
export function AlertDialogAction({ variant = 'destructive', className, ...props }: AlertDialogActionProps) {
  return <A.Action className={buttonClass({ variant, className })} {...props} />
}
