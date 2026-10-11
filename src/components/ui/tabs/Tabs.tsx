import type { ComponentProps } from 'react'
import { Tabs as T } from 'radix-ui'
import { cn } from '../../../lib/cn'

export const Tabs = T.Root

export function TabsList({ className, ...props }: ComponentProps<typeof T.List>) {
  return (
    <T.List
      className={cn('inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-glass p-1 backdrop-blur-md', className)}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof T.Trigger>) {
  return (
    <T.Trigger
      className={cn(
        'inline-flex h-control-sm shrink-0 cursor-pointer items-center gap-2 rounded-full border border-transparent px-4 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors duration-(--duration-fast)',
        'hover:text-fg data-[state=active]:border-accent-border data-[state=active]:bg-accent-soft data-[state=active]:text-accent',
        'disabled:state-disabled [&_svg]:size-4',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: ComponentProps<typeof T.Content>) {
  return <T.Content className={cn('mt-4 rounded-md', className)} {...props} />
}
