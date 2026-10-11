import { useState } from 'react'
import { Chip, ChipGroup } from '@ams/ui'

const subjects = [
  { value: 'mat', label: 'Matemáticas' },
  { value: 'fis', label: 'Física' },
  { value: 'qui', label: 'Química' },
  { value: 'len', label: 'Lenguaje' },
  { value: 'art', label: 'Artes', disabled: true },
]

export default function Filters() {
  const [selected, setSelected] = useState<string[]>(['mat'])
  const label = (v: string) => subjects.find((s) => s.value === v)?.label ?? v

  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <div>
        <p id="materias" className="mb-2 text-sm font-medium">
          Materias
        </p>
        <ChipGroup multiple aria-labelledby="materias" options={subjects} value={selected} onValueChange={setSelected} />
      </div>
      <div className="flex min-h-8 flex-wrap items-center gap-2">
        <span className="text-xs text-fg-subtle">Filtros activos:</span>
        {selected.length === 0 && <span className="text-xs text-fg-subtle">ninguno</span>}
        {selected.map((v) => (
          <Chip key={v} onRemove={() => setSelected((cur) => cur.filter((x) => x !== v))}>
            {label(v)}
          </Chip>
        ))}
      </div>
    </div>
  )
}
