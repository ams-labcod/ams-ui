import { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, Button, toast } from '@ams-labcod/ams-ui'

export default function DeletePeriod() {
  const [deleted, setDeleted] = useState(false)

  if (deleted) {
    return (
      <Button variant="secondary" onClick={() => setDeleted(false)}>
        Restaurar ejemplo
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Eliminar período 1</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title="¿Eliminar el período 1?"
        description="Se borrarán las 1.240 notas registradas y los boletines generados. Esta acción no se puede deshacer."
      >
        <AlertDialogCancel />
        <AlertDialogAction
          onClick={() => {
            setDeleted(true)
            toast.success('Período 1 eliminado')
          }}
        >
          Eliminar período
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  )
}
