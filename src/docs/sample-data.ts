// Datos de ejemplo para la documentación: estudiantes ficticios de un colegio.
// Deterministas (sin Math.random) para que las capturas y pruebas no cambien.

export interface Student {
  id: string
  name: string
  grade: '6' | '7' | '8' | '9'
  shift: 'manana' | 'tarde'
  average: number
  attendance: number
  enrolled: Date
  status: 'activo' | 'pendiente' | 'retirado'
}

const first = ['Ana', 'Luis', 'Sofía', 'Diego', 'Camila', 'Mateo', 'Valentina', 'Samuel', 'Isabella', 'Tomás', 'Mariana', 'Juan', 'Gabriela', 'Andrés', 'Lucía', 'Felipe', 'Sara', 'Nicolás', 'Daniela', 'Emilio']
const last = ['Pérez', 'Gómez', 'Restrepo', 'Quintero', 'Ruiz', 'Cárdenas', 'Moreno', 'Ríos', 'Vargas', 'Ospina', 'Arango', 'Salazar']

export const gradeLabels: Record<Student['grade'], string> = { '6': 'Sexto', '7': 'Séptimo', '8': 'Octavo', '9': 'Noveno' }
export const statusLabels: Record<Student['status'], string> = { activo: 'Activo', pendiente: 'Pago pendiente', retirado: 'Retirado' }

export const students: Student[] = Array.from({ length: 48 }, (_, i) => ({
  id: `EST-${String(i + 1).padStart(4, '0')}`,
  name: `${first[i % first.length]} ${last[(i * 7) % last.length]}`,
  grade: (['6', '7', '8', '9'] as const)[i % 4]!,
  shift: i % 3 === 0 ? 'tarde' : 'manana',
  average: Math.round((5.2 + ((i * 37) % 47) / 10) * 10) / 10,
  attendance: 78 + ((i * 13) % 22),
  enrolled: new Date(2026, (i * 5) % 9, 1 + ((i * 11) % 27)),
  status: i % 11 === 0 ? 'retirado' : i % 5 === 0 ? 'pendiente' : 'activo',
}))

export const enrollmentByMonth = [
  { mes: 'Ago', matriculas: 42, retiros: 3 },
  { mes: 'Sep', matriculas: 67, retiros: 4 },
  { mes: 'Oct', matriculas: 77, retiros: 2 },
  { mes: 'Nov', matriculas: 98, retiros: 6 },
  { mes: 'Dic', matriculas: 87, retiros: 5 },
  { mes: 'Ene', matriculas: 119, retiros: 3 },
  { mes: 'Feb', matriculas: 109, retiros: 4 },
]
