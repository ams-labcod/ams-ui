import { AreaChart } from '@juanarenas312002/ams-ui'

const data = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].flatMap((d, w) =>
  [1, 2].map((week) => ({ dia: `${d} S${week}`, asistencia: [93, 95, 94, 96, 89, 94, 96, 95, 97, 91][w * 2 + week - 1] })),
)

export default function Area() {
  return (
    <AreaChart
      className="w-full"
      title="Asistencia diaria"
      description="Porcentaje de estudiantes presentes, últimas dos semanas"
      data={data}
      index="dia"
      series={[{ key: 'asistencia', label: 'Asistencia' }]}
      valueFormatter={(n) => `${n} %`}
      height={220}
    />
  )
}
