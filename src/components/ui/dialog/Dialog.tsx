import type { ComponentProps, ReactNode } from 'react'
import { Dialog as D } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '../../../lib/cn'

export const Dialog = D.Root
export const DialogTrigger = D.Trigger
export const DialogClose = D.Close

export interface DialogContentProps extends Omit<ComponentProps<typeof D.Content>, 'title'> {
  /** Obligatorio: es el nombre accesible del diálogo. */
  title: ReactNode
  description?: ReactNode
  /** Oculta la X de la esquina (p. ej. si el pie ya tiene "Cancelar" y quieres forzar una decisión). */
  hideClose?: boolean
}

export function DialogContent({ title, description, hideClose = false, className, children, ...props }: DialogContentProps) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-(--z-overlay) bg-navy-950/60 backdrop-blur-sm animate-fade-in" />
      <D.Content
        {...(description ? null : { 'aria-describedby': undefined })}
        className={cn(
          'fixed top-1/2 left-1/2 z-(--z-modal) flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-1/2 flex-col overflow-y-auto',
          'rounded-xl border border-border-strong bg-surface p-6 text-fg shadow-pop outline-none animate-overlay-in sm:p-7',
          className,
        )}
        {...props}
      >
        <D.Title className="pr-10 font-display text-h2 font-semibold text-balance">{title}</D.Title>
        {description && <D.Description className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</D.Description>}
        {children && <div className="mt-5">{children}</div>}
        {!hideClose && (
          <D.Close
            aria-label="Cerrar"
            className="absolute top-5 right-5 inline-flex size-control-sm cursor-pointer items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-hover hover:text-fg"
          >
            <X className="size-4.5" />
          </D.Close>
        )}
      </D.Content>
    </D.Portal>
  )
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
}
