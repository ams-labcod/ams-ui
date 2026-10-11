import { LineChart } from '@ams/ui'

const data = [
  { periodo: 'P1 2025', '6.º': 7.8, '7.º': 7.4, '8.º': 7.9 },
  { periodo: 'P2 2025', '6.º': 8.0, '7.º': 7.6, '8.º': 7.7 },
  { periodo: 'P3 2025', '6.º': 8.3, '7.º': 7.5, '8.º': 8.0 },
  { periodo: 'P4 2025', '6.º': 8.1, '7.º': 7.9, '8.º': 8.2 },
  { periodo: 'P1 2026', '6.º': 8.5, '7.º': 8.1, '8.º': 8.4 },
]

export default function Lines() {
  return (
    <LineChart
      className="w-full"
      title="Promedio por grado"
      description="Rendimiento de los últimos cinco períodos, sobre 10"
      data={data}
      index="periodo"
      series={[
        { key: '6.º', label: 'Sexto' },
        { key: '7.º', label: 'Séptimo' },
        { key: '8.º', label: 'Octavo' },
      ]}
      valueFormatter={(n) => n.toLocaleString('es', { minimumFractionDigits: 1 })}
    />
  )
}
