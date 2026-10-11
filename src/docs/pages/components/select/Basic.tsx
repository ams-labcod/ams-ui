import { useState } from 'react'
import { FormField, Select } from '@ams/ui'

const courses = [
  { value: '3a', label: '3.º A · Matemáticas' },
  { value: '3b', label: '3.º B · Matemáticas' },
  { value: '4a', label: '4.º A · Física' },
  { value: '5a', label: '5.º A · Química', disabled: true },
]

export default function Basic() {
  const [course, setCourse] = useState('')
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FormField label="Curso" description="5.º A está cerrado hasta el próximo período.">
        <Select options={courses} value={course} onValueChange={setCourse} placeholder="Elige un curso" />
      </FormField>
      <p className="text-sm text-fg-muted">Seleccionado: {course || 'ninguno'}</p>
    </div>
  )
}
