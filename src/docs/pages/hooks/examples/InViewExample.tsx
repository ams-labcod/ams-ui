import { ScrollArea, Skeleton, useInView } from '@juanarenas312002/ams-ui'

function LazyCard({ n }: { n: number }) {
  // Carga el contenido solo cuando la tarjeta entra en pantalla.
  const [ref, visible] = useInView<HTMLLIElement>({ once: true, rootMargin: '0px 0px -40px 0px' })
  return (
    <li ref={ref} className="rounded-md bg-sunken p-4">
      {visible ? <p className="text-sm">Reporte mensual {n}: cargado al verse</p> : <Skeleton className="h-5 w-2/3" />}
    </li>
  )
}

export default function InViewExample() {
  return (
    <ScrollArea aria-label="Reportes" className="glass h-64 w-full max-w-sm rounded-lg">
      <ul className="flex flex-col gap-2 p-3">
        {Array.from({ length: 12 }, (_, i) => (
          <LazyCard key={i} n={i + 1} />
        ))}
      </ul>
    </ScrollArea>
  )
}
