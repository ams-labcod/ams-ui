import { UserPlus, Users } from 'lucide-react'
import { Button, EmptyState } from '@ams-labcod/ams-ui'

export default function NoStudents() {
  return (
    <EmptyState
      icon={<Users />}
      title="Este curso todavía no tiene estudiantes"
      description="Matricula estudiantes uno a uno o importa la lista desde Excel para empezar a registrar notas y asistencia."
      action={
        <>
          <Button>
            <UserPlus />
            Matricular estudiante
          </Button>
          <Button variant="secondary">Importar desde Excel</Button>
        </>
      }
    />
  )
}
