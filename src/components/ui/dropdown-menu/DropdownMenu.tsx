import type { ComponentProps, ReactNode } from 'react'
import { DropdownMenu as D } from 'radix-ui'
import { Check } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from '../menu/styles'

export const DropdownMenu = D.Root
export const DropdownMenuTrigger = D.Trigger
export const DropdownMenuGroup = D.Group

export function DropdownMenuContent({ className, sideOffset = 6, align = 'start', ...props }: ComponentProps<typeof D.Content>) {
  return (
    <D.Portal>
      <D.Content sideOffset={sideOffset} align={align} className={cn(menuContentClass, 'p-1', className)} {...props} />
    </D.Portal>
  )
}

export interface DropdownMenuItemProps extends ComponentProps<typeof D.Item> {
  icon?: ReactNode
  /** Atajo de teclado, solo informativo. */
  shortcut?: string
  /** Acción que borra o no se puede deshacer. */
  destructive?: boolean
}

export function DropdownMenuItem({ icon, shortcut, destructive = false, className, children, ...props }: DropdownMenuItemProps) {
  return (
    <D.Item
      className={cn(menuItemClass, destructive && 'text-danger data-highlighted:bg-danger-soft data-highlighted:text-danger', className)}
      {...props}
    >
      {icon}
      {children}
      {shortcut && <kbd className="ml-auto pl-4 font-sans text-xs text-fg-subtle">{shortcut}</kbd>}
    </D.Item>
  )
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof D.Label>) {
  return <D.Label className={cn(menuLabelClass, className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof D.Separator>) {
  return <D.Separator className={cn(menuSeparatorClass, className)} {...props} />
}

/** Ítem con casilla: activa o desactiva una opción sin cerrar el menú (p. ej. columnas visibles). */
export function DropdownMenuCheckboxItem({ className, children, onSelect, ...props }: ComponentProps<typeof D.CheckboxItem>) {
  return (
    <D.CheckboxItem
      className={cn(menuItemClass, 'pl-8', className)}
      onSelect={(e) => {
        e.preventDefault() // mantiene el menú abierto para marcar varias
        onSelect?.(e)
      }}
      {...props}
    >
      <D.ItemIndicator className="absolute left-2.5 text-accent">
        <Check />
      </D.ItemIndicator>
      {children}
    </D.CheckboxItem>
  )
}
