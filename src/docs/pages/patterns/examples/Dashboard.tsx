import { useState } from 'react'
import { Download } from 'lucide-react'
import {
  BarChart,
  Button,
  ChipGroup,
  Grid,
  Inline,
  LineChart,
  Progress,
  ProgressRing,
  ScrollArea,
  Stack,
  Stat,
  toast,
} from '@ams/ui'
import { enrollmentByMonth } from '../../../sample-data'

const activity = [
  { what: 'Calificación enviada', where: '3.º A · Matemáticas', when: 'hace 5 min', tone: 'success' as const },
  { what: 'Nueva matrícula', where: 'Sofía Arango · 6.º', when: 'hace 20 min', tone: 'accent' as const },
  { what: 'Pago pendiente', where: 'Mateo Ríos · Mayo', when: 'hace 1 h', tone: 'warning' as const },
  { what: 'Inasistencia', where: 'Luis Gómez · 7.º B', when: 'hace 2 h', tone: 'danger' as const },
  { what: 'Boletines generados', where: 'Primer período', when: 'ayer', tone: 'success' as const },
  { what: 'Reunión agendada', where: 'Acudientes de 8.º', when: 'ayer', tone: 'accent' as const },
]

// El punto es decorativo: el significado está en el texto de cada actividad.
const dot = { success: 'bg-success', accent: 'bg-accent', warning: 'bg-warning', danger: 'bg-danger' }

const averages = [
  { periodo: 'P1', promedio: 7.9 },
  { periodo: 'P2', promedio: 8.0 },
  { periodo: 'P3', promedio: 8.3 },
  { periodo: 'P4', promedio: 8.1 },
  { periodo: 'P1 26', promedio: 8.4 },
]

export default function Dashboard() {
  const [range, setRange] = useState('mes')

  return (
    <Stack gap={6} className="w-full">
      <Inline justify="between" gap={4}>
        <div>
          <h2 className="font-display text-h2 font-semibold">Buenos días, Carolina</h2>
          <p className="text-sm text-fg-muted">Resumen del Colegio San Andrés · Curso 2025–26</p>
        </div>
        <Inline gap={2}>
          <ChipGroup
            aria-label="Periodo del resumen"
            value={range}
            onValueChange={(v) => v && setRange(v)}
            options={[
              { value: 'semana', label: 'Semana' },
              { value: 'mes', label: 'Mes' },
              { value: 'periodo', label: 'Período' },
            ]}
          />
          <Button size="sm" variant="secondary" onClick={() => toast.success('Informe exportado', { description: 'Lo encontrarás en Descargas.' })}>
            <Download />
            Exportar
          </Button>
        </Inline>
      </Inline>

      <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        <Stat label="Estudiantes activos" value="1.284" delta={{ value: '+12', direction: 'up', label: 'vs. mes anterior' }} />
        <Stat label="Asistencia" value="94,6 %" delta={{ value: '+1,2 pts', direction: 'up' }} aside={<ProgressRing label="Asistencia del mes" value={94.6} size={56} showValue={false} />} />
        <Stat label="Promedio general" value="8,2" delta={{ value: '0,0', direction: 'flat', label: 'sin cambio' }} />
        <Stat label="Inasistencias sin justificar" value="14" delta={{ value: '+4', direction: 'up', upIsGood: false, label: 'vs. mes anterior' }} />
      </Grid>

      <Grid columns={{ base: 1, lg: 3 }} gap={4}>
        <div className="glass rounded-lg p-5 lg:col-span-2">
          <BarChart
            title="Matrículas y retiros"
            description="Por mes"
            data={enrollmentByMonth}
            index="mes"
            height={240}
            series={[
              { key: 'matriculas', label: 'Matrículas' },
              { key: 'retiros', label: 'Retiros' },
            ]}
          />
        </div>
        <div className="glass flex flex-col rounded-lg p-5">
          <h3 className="font-display font-semibold">Actividad reciente</h3>
          <ScrollArea aria-label="Actividad reciente" className="mt-3 h-64 flex-1">
            <ul className="flex flex-col gap-1 pr-3">
              {activity.map((a) => (
                <li key={a.what + a.when} className="flex items-start gap-3 rounded-sm px-2 py-2 hover:bg-hover">
                  <span aria-hidden className={`mt-1.5 size-2 shrink-0 rounded-full ${dot[a.tone]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.what}</p>
                    <p className="truncate text-xs text-fg-subtle">{a.where}</p>
                  </div>
                  <span className="shrink-0 text-xs text-fg-subtle">{a.when}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </Grid>

      <Grid columns={{ base: 1, lg: 3 }} gap={4}>
        <div className="glass rounded-lg p-5 lg:col-span-2">
          <LineChart
            title="Promedio general por período"
            data={averages}
            index="periodo"
            height={200}
            series={[{ key: 'promedio', label: 'Promedio' }]}
            valueFormatter={(n) => n.toLocaleString('es', { minimumFractionDigits: 1 })}
          />
        </div>
        <Stack gap={5} className="glass rounded-lg p-5">
          <h3 className="font-display font-semibold">Cierre del período</h3>
          <Progress label="Notas registradas" value={86} showValue tone="success" />
          <Progress label="Boletines enviados" value={41} showValue />
          <Progress label="Cartera recaudada" value={62} showValue tone="warning" />
        </Stack>
      </Grid>
    </Stack>
  )
}
