import { useState } from 'react'
import { Checkbox } from '@ams/ui'

const students = ['Ana M. Pérez', 'Luis F. Gómez', 'Sofía Restrepo']

export default function Indeterminate() {
  const [selected, setSelected] = useState<string[]>(['Ana M. Pérez'])
  const all = selected.length === students.length

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">Estudiantes</legend>
      <Checkbox
        label="Todos los estudiantes"
        checked={all}
        indeterminate={selected.length > 0 && !all}
        onChange={() => setSelected(all ? [] : students)}
      />
      <div className="flex flex-col gap-3 pl-7">
        {students.map((s) => (
          <Checkbox
            key={s}
            label={s}
            checked={selected.includes(s)}
            onChange={(e) => setSelected((cur) => (e.target.checked ? [...cur, s] : cur.filter((x) => x !== s)))}
          />
        ))}
      </div>
    </fieldset>
  )
}
