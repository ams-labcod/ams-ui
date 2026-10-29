import { Plus } from 'lucide-react'
import { Button } from '@ams-labcod/ams-ui'

export default function Sizes() {
  return (
    <>
      <Button size="sm">Pequeño</Button>
      <Button size="md">Mediano</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon-sm" variant="secondary" aria-label="Agregar estudiante">
        <Plus />
      </Button>
      <Button size="icon" aria-label="Agregar estudiante">
        <Plus />
      </Button>
    </>
  )
}
