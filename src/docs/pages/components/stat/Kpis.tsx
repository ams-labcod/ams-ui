import { Grid, ProgressRing, Stat } from '@juanarenas312002/ams-ui'

export default function Kpis() {
  return (
    <Grid columns={{ base: 1, sm: 2 }} gap={4} className="w-full max-w-2xl">
      <Stat label="Estudiantes activos" value="1.284" delta={{ value: '+12', direction: 'up', label: 'vs. mes anterior' }} />
      <Stat label="Asistencia" value="94,6 %" aside={<ProgressRing label="Asistencia del mes" value={94.6} size={56} showValue={false} />} />
      <Stat label="Inasistencias sin justificar" value="14" delta={{ value: '+4', direction: 'up', upIsGood: false, label: 'vs. mes anterior' }} />
      <Stat label="Promedio general" value="8,2" delta={{ value: '0,0', direction: 'flat', label: 'sin cambio' }} />
    </Grid>
  )
}
