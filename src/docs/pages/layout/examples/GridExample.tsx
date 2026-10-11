import { Grid } from '@ams/ui'

const modules = ['Calificaciones', 'Asistencia', 'Calendario', 'Matrículas', 'Pagos', 'Reportes']

export default function GridExample() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Columnas por punto de corte: 1 en móvil, 2 desde 880 px, 3 desde 980 px. */}
      <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {modules.map((m) => (
          <div key={m} className="glass rounded-lg p-5 font-display font-semibold">
            {m}
          </div>
        ))}
      </Grid>
      {/* Tantas columnas como quepan, cada una de al menos 12 rem. */}
      <Grid minItemWidth="12rem" gap={3}>
        {modules.map((m) => (
          <div key={m} className="rounded-md bg-sunken px-4 py-3 text-sm text-fg-muted">
            {m}
          </div>
        ))}
      </Grid>
    </div>
  )
}
