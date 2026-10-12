import { CalendarX } from 'lucide-react'
import { EmptyState, Table, TableBody, TableEmpty, TableHead, TableHeader, TableRow } from '@juanarenas312002/ams-ui'

export default function Empty() {
  return (
    <Table containerClassName="max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Estudiante</TableHead>
          <TableHead>Motivo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={3}>
          <EmptyState icon={<CalendarX />} title="Sin inasistencias esta semana" description="Las ausencias que registren los docentes aparecerán aquí." />
        </TableEmpty>
      </TableBody>
    </Table>
  )
}
