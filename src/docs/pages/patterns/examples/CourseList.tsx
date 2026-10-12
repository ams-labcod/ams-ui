import { useEffect, useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Avatar, Badge, Button, ChipGroup, EmptyState, Grid, Inline, Input, Progress, Select, Skeleton, Stack, useDebouncedValue } from '@juanarenas312002/ams-ui'

type Area = 'ciencias' | 'humanidades' | 'artes'
interface Course {
  id: string
  name: string
  group: string
  area: Area
  teacher: string
  students: number
  progress: number
}

const areaLabels: Record<Area, string> = { ciencias: 'Ciencias', humanidades: 'Humanidades', artes: 'Artes' }

const courses: Course[] = [
  { id: 'c1', name: 'Matemáticas', group: '3.º A', area: 'ciencias', teacher: 'Carolina Reyes', students: 32, progress: 72 },
  { id: 'c2', name: 'Física', group: '4.º B', area: 'ciencias', teacher: 'Javier Molina', students: 28, progress: 58 },
  { id: 'c3', name: 'Lenguaje', group: '3.º A', area: 'humanidades', teacher: 'Patricia Delgado', students: 32, progress: 81 },
  { id: 'c4', name: 'Historia', group: '5.º A', area: 'humanidades', teacher: 'Diego Quintero', students: 30, progress: 44 },
  { id: 'c5', name: 'Química', group: '5.º B', area: 'ciencias', teacher: 'Camila Ruiz', students: 27, progress: 66 },
  { id: 'c6', name: 'Música', group: '2.º A', area: 'artes', teacher: 'Mateo Cárdenas', students: 25, progress: 90 },
  { id: 'c7', name: 'Artes plásticas', group: '4.º A', area: 'artes', teacher: 'Valentina Ríos', students: 29, progress: 35 },
]

const sorters = {
  name: (a: Course, b: Course) => a.name.localeCompare(b.name, 'es'),
  progress: (a: Course, b: Course) => b.progress - a.progress,
  students: (a: Course, b: Course) => b.students - a.students,
}

export default function CourseList() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [areas, setAreas] = useState<string[]>([])
  const [sort, setSort] = useState<keyof typeof sorters>('name')
  const debounced = useDebouncedValue(query, 250)

  // Simula la primera carga.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const visible = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    return courses
      .filter((c) => (areas.length === 0 || areas.includes(c.area)) && (!q || `${c.name} ${c.group} ${c.teacher}`.toLowerCase().includes(q)))
      .sort(sorters[sort])
  }, [debounced, areas, sort])

  const clear = () => {
    setQuery('')
    setAreas([])
  }

  return (
    <Stack gap={5} className="w-full">
      <Inline gap={3} justify="between">
        <Inline gap={3}>
          <Input type="search" aria-label="Buscar curso" placeholder="Curso, grupo o docente" startIcon={<Search />} value={query} onChange={(e) => setQuery(e.target.value)} className="h-control-sm w-64 rounded-full" />
          <ChipGroup
            multiple
            aria-label="Área"
            value={areas}
            onValueChange={setAreas}
            options={Object.entries(areaLabels).map(([value, label]) => ({ value, label }))}
          />
        </Inline>
        <Select
          aria-label="Ordenar por"
          value={sort}
          onValueChange={(v) => setSort(v as keyof typeof sorters)}
          className="h-control-sm w-48"
          options={[
            { value: 'name', label: 'Ordenar por nombre' },
            { value: 'progress', label: 'Más avanzados' },
            { value: 'students', label: 'Más estudiantes' },
          ]}
        />
      </Inline>

      <p className="text-sm text-fg-muted" aria-live="polite">
        {loading ? 'Cargando cursos…' : `${visible.length} de ${courses.length} cursos`}
      </p>

      {loading ? (
        <Grid minItemWidth="16rem" gap={4} aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="glass flex flex-col gap-3 rounded-lg p-5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-4 h-2.5 w-full rounded-full" />
            </div>
          ))}
        </Grid>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<SearchX />}
          title="Ningún curso coincide"
          description="Prueba con otro nombre o quita los filtros de área."
          action={
            <Button variant="secondary" onClick={clear}>
              Limpiar búsqueda y filtros
            </Button>
          }
        />
      ) : (
        <Grid as="ul" minItemWidth="16rem" gap={4}>
          {visible.map((c) => (
            <li
              key={c.id}
              // Toda la tarjeta es clicable por el enlace del título; el anillo de foco rodea la tarjeta.
              className="glass relative flex flex-col gap-4 rounded-lg p-5 transition-colors hover:border-accent-border has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
            >
              <Inline justify="between" align="start" wrap={false}>
                <div>
                  <h3 className="font-display text-h3 font-semibold">
                    <a href="#/listado-con-filtros" className="outline-none after:absolute after:inset-0">
                      {c.name}
                    </a>
                  </h3>
                  <p className="text-sm text-fg-muted">
                    {c.group} · {c.students} estudiantes
                  </p>
                </div>
                <Badge variant="accent">{areaLabels[c.area]}</Badge>
              </Inline>
              <Progress label="Avance del programa" value={c.progress} showValue size="sm" />
              <Inline gap={2} className="text-sm text-fg-muted">
                <Avatar name={c.teacher} size="sm" aria-hidden />
                {c.teacher}
              </Inline>
            </li>
          ))}
        </Grid>
      )}
    </Stack>
  )
}
