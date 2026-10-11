import type { ComponentProps } from 'react'
import { cn } from '../../../lib/cn'

// Tabla semántica con estilos de AMS. Superficie sólida (sin vidrio): en
// listas largas el desenfoque es caro y resta legibilidad.

export interface TableProps extends ComponentProps<'table'> {
  /** Clases del contenedor con borde y desplazamiento horizontal. */
  containerClassName?: string
}

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div className={cn('relative w-full overflow-x-auto rounded-lg border border-border bg-surface', containerClassName)}>
      <table className={cn('w-full caption-bottom border-collapse text-left text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead className={cn('bg-sunken', className)} {...props} />
}

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return <tbody className={cn('[&>tr:last-child]:border-b-0', className)} {...props} />
}

export function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return <tfoot className={cn('border-t border-border bg-sunken font-medium text-fg', className)} {...props} />
}

export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      className={cn('border-b border-border transition-colors duration-(--duration-fast) hover:bg-hover data-[state=selected]:bg-accent-soft', className)}
      {...props}
    />
  )
}

export function TableHead({ className, scope = 'col', ...props }: ComponentProps<'th'>) {
  return <th scope={scope} className={cn('h-11 px-4 text-xs font-medium whitespace-nowrap text-fg-subtle', className)} {...props} />
}

export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cn('px-4 py-3 align-middle text-fg-muted', className)} {...props} />
}

export function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return <caption className={cn('px-4 py-3 text-xs text-fg-subtle', className)} {...props} />
}

/** Fila que ocupa todas las columnas, para estados vacíos o de carga. */
export function TableEmpty({ colSpan, className, children, ...props }: ComponentProps<'td'> & { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('p-0', className)} {...props}>
        {children}
      </td>
    </tr>
  )
}
