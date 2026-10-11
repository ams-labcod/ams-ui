import type { ComponentProps } from 'react'
import { cn } from '../../../lib/cn'

/** Bloque de carga. Es decorativo: marca el contenedor con aria-busy y un texto para lectores de pantalla. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return <div aria-hidden className={cn('animate-pulse rounded-md bg-hover', className)} {...props} />
}
