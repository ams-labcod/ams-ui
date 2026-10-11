import { cn } from '../../lib/cn'

const blob = 'pointer-events-none fixed -z-10 rounded-full blur-[90px] animate-float opacity-(--ams-blob-opacity)'

/** Fondo ambiental de la marca. Se monta una vez por página, detrás de todo. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div
        className={cn(
          'fixed inset-0 -z-20 bg-(image:--ams-aurora)',
          'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,var(--ams-aurora-dots)_1px,transparent_0)] before:bg-size-[32px_32px] before:mask-[radial-gradient(ellipse_at_center,black_30%,transparent_80%)]',
        )}
      />
      <div className={cn(blob, '-top-50 -left-40 size-135 bg-[radial-gradient(circle,rgb(77_182_172/0.55),transparent_70%)]')} />
      <div className={cn(blob, 'top-[30%] -right-35 size-115 bg-[radial-gradient(circle,rgb(94_168_255/0.3),transparent_70%)] [animation-delay:-7s]')} />
      <div className={cn(blob, '-bottom-50 left-[30%] size-150 bg-[radial-gradient(circle,rgb(77_182_172/0.25),transparent_70%)] [animation-delay:-12s]')} />
    </div>
  )
}
