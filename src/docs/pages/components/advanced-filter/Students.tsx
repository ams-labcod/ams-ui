import { useState } from 'react'
import { AdvancedFilter, applyFilter, formatNumber, type FilterField, type FilterState } from '@juanarenas312002/ams-ui'
import { gradeLabels, students } from '../../../sample-data'

const fields: FilterField[] = [
  { id: 'name', label: 'Nombre', type: 'text' },
  { id: 'grade', label: 'Grado', type: 'select', options: Object.entries(gradeLabels).map(([value, label]) => ({ value, label })) },
  { id: 'average', label: 'Promedio', type: 'number' },
  { id: 'enrolled', label: 'Matrícula', type: 'date' },
]

export default function Students() {
  // Empieza con dos condiciones para que se vean los chips.
  const [filter, setFilter] = useState<FilterState>({
    join: 'and',
    conditions: [
      { id: 'a', field: 'grade', operator: 'is', value: ['6', '7'] },
      { id: 'b', field: 'average', operator: 'gte', value: 8 },
    ],
  })
  const result = applyFilter(students, filter)

  return (
    <div className="flex w-full flex-col gap-4">
      <AdvancedFilter fields={fields} value={filter} onChange={setFilter} />
      <p className="text-sm text-fg-muted" aria-live="polite">
        {formatNumber(result.length)} de {formatNumber(students.length)} estudiantes
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {result.slice(0, 6).map((s) => (
          <li key={s.id} className="flex justify-between rounded-sm bg-sunken px-3 py-2 text-sm">
            <span>
              {s.name} <span className="text-fg-subtle">· {gradeLabels[s.grade]}</span>
            </span>
            <span className="font-semibold tabular-nums">{s.average.toLocaleString('es', { minimumFractionDigits: 1 })}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
