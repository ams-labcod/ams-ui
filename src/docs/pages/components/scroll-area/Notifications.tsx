import { ScrollArea } from '@ams/ui'

const items = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  title: ['Calificación enviada', 'Nueva matrícula', 'Pago recibido', 'Inasistencia registrada'][i % 4],
  meta: `${['3.º A', '4.º B', '5.º A'][i % 3]} · hace ${i + 1} h`,
}))

export default function Notifications() {
  return (
    <ScrollArea aria-label="Actividad reciente" className="glass h-72 w-full max-w-sm rounded-lg">
      <ul className="flex flex-col p-2">
        {items.map((n) => (
          <li key={n.id} className="rounded-sm px-3 py-2.5 hover:bg-hover">
            <p className="text-sm font-medium">{n.title}</p>
            <p className="text-xs text-fg-subtle">{n.meta}</p>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
