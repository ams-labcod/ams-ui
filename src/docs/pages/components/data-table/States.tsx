import { useState } from 'react'
import { UserPlus, Users } from 'lucide-react'
import { Button, ChipGroup, DataTable, EmptyState, useDataTable, type ColumnDef } from '@ams-labcod/ams-ui'
import { students, type Student } from '../../../sample-data'

const columns: ColumnDef<Student>[] = [
  { accessorKey: 'name', header: 'Estudiante' },
  { accessorKey: 'id', header: 'Código' },
  { accessorKey: 'average', header: 'Promedio', meta: { align: 'right' } },
]

export default function States() {
  const [state, setState] = useState('loading')
  const table = useDataTable({ data: state === 'data' ? students.slice(0, 5) : [], columns, pageSize: 5 })

  return (
    <div className="flex w-full flex-col gap-4">
      <ChipGroup
        aria-label="Estado de la tabla"
        value={state}
        onValueChange={(v) => v && setState(v)}
        options={[
          { value: 'loading', label: 'Cargando' },
          { value: 'empty', label: 'Sin datos' },
          { value: 'data', label: 'Con datos' },
        ]}
      />
      <DataTable
        table={table}
        label="Estudiantes de 3.º A"
        loading={state === 'loading'}
        empty={
          <EmptyState
            icon={<Users />}
            title="Este curso no tiene estudiantes"
            description="Matricula al primero o importa la lista desde Excel."
            action={
              <Button size="sm">
                <UserPlus />
                Matricular estudiante
              </Button>
            }
          />
        }
      />
    </div>
  )
}
