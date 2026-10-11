import { SearchX } from 'lucide-react'
import { Button, EmptyState } from '@ams/ui'

export default function NoResults() {
  return (
    <EmptyState
      icon={<SearchX />}
      title="Ningún estudiante coincide con «Gonzales»"
      description="Revisa la ortografía o busca por número de documento."
      action={<Button variant="ghost">Limpiar búsqueda</Button>}
    />
  )
}
