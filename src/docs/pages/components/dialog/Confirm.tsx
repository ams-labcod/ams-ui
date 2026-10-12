import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@juanarenas312002/ams-ui'

export default function Confirm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Retirar estudiante</Button>
      </DialogTrigger>
      <DialogContent
        title="¿Retirar a Luis F. Gómez de 3.º A?"
        description="Dejará de aparecer en listas y libretas. Sus notas se conservan en el historial y puedes volver a matricularlo."
      >
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Retirar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
