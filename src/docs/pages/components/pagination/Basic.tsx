import { useState } from 'react'
import { Pagination } from '@ams-labcod/ams-ui'

export default function Basic() {
  const [page, setPage] = useState(6)
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
      <p className="text-sm text-fg-muted">Página {page} de 20</p>
    </div>
  )
}
