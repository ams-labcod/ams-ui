import { useEffect, useState } from 'react'
import { Avatar, Button, Skeleton } from '@ams/ui'

export default function StudentCard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div aria-busy={loading} className="glass flex w-full items-center gap-4 rounded-lg p-5">
        {loading ? (
          <>
            <span className="sr-only">Cargando estudiante</span>
            <Skeleton className="size-14 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </>
        ) : (
          <>
            <Avatar name="Sofía Restrepo" size="lg" />
            <div>
              <p className="font-display font-semibold">Sofía Restrepo</p>
              <p className="text-sm text-fg-muted">3.º A · Promedio 9,6</p>
            </div>
          </>
        )}
      </div>
      <Button size="sm" variant="ghost" onClick={() => setLoading(true)} disabled={loading}>
        Volver a cargar
      </Button>
    </div>
  )
}
