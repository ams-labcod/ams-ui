import { useCallback, useEffect, useState } from 'react'
import { CalendarCheck, RotateCw } from 'lucide-react'
import { Alert, Button, ChipGroup, EmptyState, Inline, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from '@juanarenas312002/ams-ui'

type Outcome = 'ok' | 'empty' | 'error'
type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; rows: string[][] }

const rows = [
  ['Jue 12', 'Examen de Matemáticas', '3.º A'],
  ['Vie 13', 'Entrega de proyecto de Física', '4.º B'],
  ['Lun 16', 'Reunión de acudientes', 'Todos'],
]

// Simula una petición que tarda 1 s y termina como se le pida.
const fetchEvents = (outcome: Outcome) =>
  new Promise<string[][]>((ok, fail) => setTimeout(() => (outcome === 'error' ? fail(new Error('timeout')) : ok(outcome === 'empty' ? [] : rows)), 1000))

export default function LoadStates() {
  const [outcome, setOutcome] = useState<Outcome>('error')
  const [state, setState] = useState<State>({ status: 'loading' })

  const load = useCallback(() => {
    setState({ status: 'loading' })
    fetchEvents(outcome).then(
      (r) => setState({ status: 'ready', rows: r }),
      () => setState({ status: 'error' }),
    )
  }, [outcome])

  useEffect(load, [load])

  return (
    <Stack gap={5} className="w-full max-w-2xl">
      <Inline justify="between" gap={3}>
        <ChipGroup
          aria-label="Resultado simulado de la petición"
          value={outcome}
          onValueChange={(v) => v && setOutcome(v as Outcome)}
          options={[
            { value: 'ok', label: 'Con datos' },
            { value: 'empty', label: 'Sin datos' },
            { value: 'error', label: 'Error' },
          ]}
        />
        <Button size="sm" variant="secondary" onClick={load} loading={state.status === 'loading'}>
          <RotateCw />
          Recargar
        </Button>
      </Inline>

      <section aria-labelledby="proximos" aria-busy={state.status === 'loading'} className="glass rounded-lg p-5">
        <h3 id="proximos" className="mb-4 font-display font-semibold">
          Próximos eventos
        </h3>

        {state.status === 'loading' && (
          <Stack gap={3}>
            <span className="sr-only">Cargando eventos</span>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </Stack>
        )}

        {state.status === 'error' && (
          <Alert
            variant="danger"
            title="No pudimos cargar los eventos"
            action={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setOutcome('ok')
                  toast.info('Reintentando…')
                }}
              >
                Reintentar
              </Button>
            }
          >
            El servidor tardó demasiado en responder. Tus datos están a salvo; vuelve a intentarlo en unos segundos.
          </Alert>
        )}

        {state.status === 'ready' && state.rows.length === 0 && (
          <EmptyState icon={<CalendarCheck />} title="No hay eventos esta semana" description="Los exámenes, entregas y reuniones que se programen aparecerán aquí." className="py-6" />
        )}

        {state.status === 'ready' && state.rows.length > 0 && (
          <Table aria-label="Próximos eventos">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Fecha</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Curso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.rows.map(([date, what, who]) => (
                <TableRow key={what}>
                  <TableCell className="text-fg">{date}</TableCell>
                  <TableCell>{what}</TableCell>
                  <TableCell>{who}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </Stack>
  )
}
