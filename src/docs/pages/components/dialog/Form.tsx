import { useState, type FormEvent } from 'react'
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger, FormField, Input, Textarea } from '@ams-labcod/ams-ui'

export default function Form() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Nueva tarea</Button>
      </DialogTrigger>
      <DialogContent title="Nueva tarea" description="Los estudiantes de 3.º A la verán en su panel.">
        <form onSubmit={submit} className="grid gap-5">
          <FormField label="Título" required>
            <Input name="title" placeholder="Taller de fracciones" />
          </FormField>
          <FormField label="Instrucciones">
            <Textarea name="body" rows={3} />
          </FormField>
          <FormField label="Fecha de entrega">
            <Input name="due" type="date" />
          </FormField>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit" loading={saving}>
              Publicar tarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
