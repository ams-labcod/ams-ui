import type { ComponentProps, ReactNode } from 'react'
import { Command as C } from 'cmdk'
import { Dialog as D } from 'radix-ui'
import { Search } from 'lucide-react'
import { cn } from '../../../lib/cn'

export function Command({ className, ...props }: ComponentProps<typeof C>) {
  return <C className={cn('flex flex-col overflow-hidden rounded-md border border-border bg-surface text-fg', className)} {...props} />
}

export function CommandInput({ className, ...props }: ComponentProps<typeof C.Input>) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border px-4">
      <Search aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      <C.Input className={cn('h-control-md w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle', className)} {...props} />
    </div>
  )
}

export function CommandList({ className, ...props }: ComponentProps<typeof C.List>) {
  return <C.List className={cn('max-h-80 overflow-y-auto overscroll-contain p-1.5', className)} {...props} />
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof C.Empty>) {
  return <C.Empty className={cn('px-4 py-8 text-center text-sm text-fg-muted', className)} {...props} />
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof C.Group>) {
  return (
    <C.Group
      className={cn('[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-fg-subtle', className)}
      {...props}
    />
  )
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof C.Separator>) {
  return <C.Separator className={cn('-mx-1.5 my-1.5 h-px bg-border', className)} {...props} />
}

export interface CommandItemProps extends ComponentProps<typeof C.Item> {
  icon?: ReactNode
  shortcut?: string
}

export function CommandItem({ icon, shortcut, className, children, ...props }: CommandItemProps) {
  return (
    <C.Item
      className={cn(
        'relative flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-fg-muted outline-none select-none [&_svg]:size-4 [&_svg]:shrink-0',
        'data-[selected=true]:bg-hover data-[selected=true]:text-fg data-[disabled=true]:state-disabled',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {shortcut && <kbd className="ml-auto pl-4 font-sans text-xs text-fg-subtle">{shortcut}</kbd>}
    </C.Item>
  )
}

export interface CommandDialogProps extends Omit<ComponentProps<typeof C>, 'title'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Nombre accesible del diálogo (no se muestra). */
  title?: string
}

/** Paleta de comandos en un diálogo, para abrir con Ctrl/⌘+K. */
export function CommandDialog({ open, onOpenChange, title = 'Buscar', children, className, ...props }: CommandDialogProps) {
  return (
    <D.Root open={open} onOpenChange={onOpenChange}>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-(--z-overlay) bg-navy-950/60 backdrop-blur-sm animate-fade-in" />
        <D.Content
          aria-describedby={undefined}
          className="fixed top-[12vh] left-1/2 z-(--z-modal) w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 outline-none animate-overlay-in"
        >
          <D.Title className="sr-only">{title}</D.Title>
          <Command loop className={cn('border-border-strong shadow-pop', className)} {...props}>
            {children}
          </Command>
        </D.Content>
      </D.Portal>
    </D.Root>
  )
}
