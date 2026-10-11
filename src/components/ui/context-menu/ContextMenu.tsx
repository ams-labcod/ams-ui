import type { ComponentProps, ReactNode } from 'react'
import { ContextMenu as C } from 'radix-ui'
import { cn } from '../../../lib/cn'
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from '../menu/styles'

export const ContextMenu = C.Root
export const ContextMenuTrigger = C.Trigger
export const ContextMenuGroup = C.Group

export function ContextMenuContent({ className, ...props }: ComponentProps<typeof C.Content>) {
  return (
    <C.Portal>
      <C.Content className={cn(menuContentClass, 'p-1', className)} {...props} />
    </C.Portal>
  )
}

export interface ContextMenuItemProps extends ComponentProps<typeof C.Item> {
  icon?: ReactNode
  shortcut?: string
  destructive?: boolean
}

export function ContextMenuItem({ icon, shortcut, destructive = false, className, children, ...props }: ContextMenuItemProps) {
  return (
    <C.Item className={cn(menuItemClass, destructive && 'text-danger data-highlighted:bg-danger-soft data-highlighted:text-danger', className)} {...props}>
      {icon}
      {children}
      {shortcut && <kbd className="ml-auto pl-4 font-sans text-xs text-fg-subtle">{shortcut}</kbd>}
    </C.Item>
  )
}

export function ContextMenuLabel({ className, ...props }: ComponentProps<typeof C.Label>) {
  return <C.Label className={cn(menuLabelClass, className)} {...props} />
}

export function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof C.Separator>) {
  return <C.Separator className={cn(menuSeparatorClass, className)} {...props} />
}
