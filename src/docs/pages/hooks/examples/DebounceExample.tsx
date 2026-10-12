import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input, useDebouncedValue } from '@juanarenas312002/ams-ui'

export default function DebounceExample() {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 400)
  const [requests, setRequests] = useState(0)

  // En tu app, aquí iría la petición al servidor.
  useEffect(() => {
    if (debounced) setRequests((n) => n + 1)
  }, [debounced])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input type="search" aria-label="Buscar estudiante" placeholder="Escribe rápido un nombre" startIcon={<Search />} value={query} onChange={(e) => setQuery(e.target.value)} />
      <p className="text-sm text-fg-muted">
        Buscando: «{debounced}» · peticiones enviadas: <strong className="text-fg">{requests}</strong>
      </p>
    </div>
  )
}
