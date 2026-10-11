import { Badge, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@ams/ui'

const students = [
  { name: 'Ana M. Pérez', p1: 9.4, p2: 9.1, p3: 8.7 },
  { name: 'Luis F. Gómez', p1: 8.2, p2: 7.5, p3: 8.0 },
  { name: 'Sofía Restrepo', p1: 9.6, p2: 9.3, p3: 9.5 },
  { name: 'Diego Quintero', p1: 5.1, p2: 6.0, p3: 5.4 },
]

const avg = (s: (typeof students)[number]) => (s.p1 + s.p2 + s.p3) / 3
const fmt = (n: number) => n.toLocaleString('es', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export default function Grades() {
  return (
    <Table containerClassName="max-w-2xl">
      <TableCaption>Matemáticas · 3.º A · Notas sobre 10</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Estudiante</TableHead>
          <TableHead className="text-right">P1</TableHead>
          <TableHead className="text-right">P2</TableHead>
          <TableHead className="text-right">P3</TableHead>
          <TableHead className="text-right">Promedio</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((s) => (
          <TableRow key={s.name}>
            <TableHead scope="row" className="h-auto text-sm font-normal text-fg">
              {s.name}
            </TableHead>
            {[s.p1, s.p2, s.p3].map((n, i) => (
              <TableCell key={i} className={n < 6 ? 'text-right text-danger tabular-nums' : 'text-right tabular-nums'}>
                {fmt(n)}
              </TableCell>
            ))}
            <TableCell className="text-right font-display font-semibold text-fg tabular-nums">{fmt(avg(s))}</TableCell>
            <TableCell>{avg(s) >= 6 ? <Badge variant="success">Aprobado</Badge> : <Badge variant="danger">En riesgo</Badge>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={4} className="text-fg">
            Promedio del curso
          </TableCell>
          <TableCell className="text-right font-display font-semibold text-accent tabular-nums">{fmt(students.reduce((t, s) => t + avg(s), 0) / students.length)}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  )
}
