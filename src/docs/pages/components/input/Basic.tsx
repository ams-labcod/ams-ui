import { Search } from 'lucide-react'
import { FormField, Input } from '@ams/ui'

export default function Basic() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <FormField label="Nombre del estudiante">
        <Input placeholder="Ana María Pérez" autoComplete="name" />
      </FormField>
      <FormField label="Buscar">
        <Input type="search" startIcon={<Search />} placeholder="Nombre o documento" />
      </FormField>
    </div>
  )
}
