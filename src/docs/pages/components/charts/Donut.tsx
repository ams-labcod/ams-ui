import { DonutChart, formatCurrency } from '@ams/ui'

export default function Donut() {
  return (
    <DonutChart
      className="w-full"
      title="Cartera de mayo"
      description="Pensiones por estado de pago"
      centerLabel="facturado"
      valueFormatter={(n) => formatCurrency(n)}
      centerFormatter={(n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', notation: 'compact' }).format(n)}
      data={[
        { label: 'Pagado', value: 198_500_000 },
        { label: 'Pendiente', value: 36_200_000 },
        { label: 'En acuerdo de pago', value: 12_800_000 },
      ]}
    />
  )
}
