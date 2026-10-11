import type { ComponentProps } from 'react'
import { cn } from '../../../lib/cn'
import { controlClass, useFieldControl } from '../field/Field'

export function Textarea({ className, rows = 4, ...props }: ComponentProps<'textarea'>) {
  const control = useFieldControl(props)
  return <textarea rows={rows} {...control} className={cn(controlClass, 'min-h-24 resize-y py-2.5 leading-relaxed', className)} />
}
