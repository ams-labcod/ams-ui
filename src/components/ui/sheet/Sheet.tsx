import type { ComponentProps, ReactNode } from 'react'
import { Dialog as D } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '../../../lib/cn'

export const Sheet = D.Root
export const SheetTrigger = D.Trigger
export const SheetClose = D.Close

const sides = {
  right: 'inset-y-0 right-0 h-full w-full max-w-md border-l [--sheet-from:100%_0]',
  left: 'inset-y-0 left-0 h-full w-full max-w-md border-r [--sheet-from:-100%_0]',
  bottom: 'inset-x-0 bottom-0 max-h-[85dvh] w-full rounded-t-xl border-t [--sheet-from:0_100%]',
  top: 'inset-x-0 top-0 max-h-[85dvh] w-full rounded-b-xl border-b [--sheet-from:0_-100%]',
} as const

export interface SheetContentProps extends Omit<ComponentProps<typeof D.Content>, 'title'> {
  /** Obligatorio: nombre accesible del panel. */
  title: ReactNode
  description?: ReactNode
  side?: keyof typeof sides
  /** Acciones fijas al pie (no se desplazan con el contenido). */
  footer?: ReactNode
}

export function SheetContent({ title, description, side = 'right', footer, className, children, ...props }: SheetContentProps) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-(--z-overlay) bg-navy-950/60 backdrop-blur-sm animate-fade-in" />
      <D.Content
        {...(description ? null : { 'aria-describedby': undefined })}
        className={cn(
          'fixed z-(--z-modal) flex flex-col border-border-strong bg-surface text-fg shadow-pop outline-none animate-sheet-in',
          sides[side],
          className,
        )}
        {...props}
      >
        <header className="flex items-start gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0 flex-1">
            <D.Title className="font-display text-h3 font-semibold">{title}</D.Title>
            {description && <D.Description className="mt-1 text-sm text-fg-muted">{description}</D.Description>}
          </div>
          <D.Close
            aria-label="Cerrar"
            className="-mt-1 -mr-2 inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-hover hover:text-fg"
          >
            <X className="size-4.5" />
          </D.Close>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">{footer}</footer>}
      </D.Content>
    </D.Portal>
  )
}
