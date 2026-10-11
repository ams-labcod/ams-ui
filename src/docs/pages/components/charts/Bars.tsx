import { BarChart } from '@ams/ui'
import { enrollmentByMonth } from '../../../sample-data'

export default function Bars() {
  return (
    <BarChart
      className="w-full"
      title="Matrículas y retiros por mes"
      description="Curso 2025–26"
      data={enrollmentByMonth}
      index="mes"
      series={[
        { key: 'matriculas', label: 'Matrículas' },
        { key: 'retiros', label: 'Retiros' },
      ]}
    />
  )
}
