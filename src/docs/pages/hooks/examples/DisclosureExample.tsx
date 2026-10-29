import { Button, Sheet, SheetContent, useDisclosure } from '@ams-labcod/ams-ui'

export default function DisclosureExample() {
  const filters = useDisclosure()
  return (
    <>
      <Button variant="secondary" onClick={filters.onOpen}>
        Abrir filtros
      </Button>
      <Sheet open={filters.open} onOpenChange={filters.setOpen}>
        <SheetContent title="Filtros" footer={<Button onClick={filters.onClose}>Aplicar</Button>}>
          <p className="text-sm text-fg-muted">El estado vive en useDisclosure: cualquier botón puede abrir o cerrar el panel.</p>
        </SheetContent>
      </Sheet>
    </>
  )
}
