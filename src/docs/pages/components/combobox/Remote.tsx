import { useEffect, useState } from 'react'
import { Combobox, type ComboboxOption } from '@juanarenas312002/ams-ui'

const schools = ['Colegio San Andrés', 'IE Los Pinos', 'Liceo Moderno', 'Colegio Santa María', 'IE La Esperanza', 'Gimnasio Los Andes']

// Simula una búsqueda en el servidor con 500 ms de espera.
const searchSchools = (q: string) =>
  new Promise<ComboboxOption[]>((ok) =>
    setTimeout(() => ok(schools.filter((s) => s.toLowerCase().includes(q.toLowerCase())).map((s) => ({ value: s, label: s }))), 500),
  )

export default function Remote() {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<ComboboxOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    searchSchools(query).then((r) => {
      if (cancelled) return
      setOptions(r)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [query])

  return <Combobox aria-label="Institución" className="max-w-sm" options={options} loading={loading} onSearch={setQuery} placeholder="Busca una institución" emptyMessage="No hay instituciones con ese nombre." />
}
