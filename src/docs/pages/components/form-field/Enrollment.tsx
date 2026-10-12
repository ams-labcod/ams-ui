import { useState, type FormEvent } from 'react'
import { Button, Checkbox, FormField, Input, Select } from '@juanarenas312002/ams-ui'

type Errors = Partial<Record<'name' | 'email' | 'grade', string>>

export default function Enrollment() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!String(data.get('name')).trim()) next.name = 'Escribe el nombre completo del estudiante.'
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email')))) next.email = 'Escribe un correo con @, por ejemplo nombre@correo.com.'
    if (!data.get('grade')) next.grade = 'Elige el grado al que entra.'
    setErrors(next)
    setSent(Object.keys(next).length === 0)
  }

  return (
    <form noValidate onSubmit={submit} className="grid w-full max-w-md gap-5">
      <FormField label="Nombre del estudiante" required error={errors.name}>
        <Input name="name" autoComplete="name" />
      </FormField>
      <FormField label="Correo del acudiente" description="Aquí llegarán los boletines." required error={errors.email}>
        <Input name="email" type="email" autoComplete="email" />
      </FormField>
      <FormField label="Grado" required error={errors.grade}>
        <Select
          name="grade"
          options={[
            { value: '6', label: 'Sexto' },
            { value: '7', label: 'Séptimo' },
            { value: '8', label: 'Octavo' },
          ]}
        />
      </FormField>
      <Checkbox name="photos" label="Autorizo el uso de fotografías en actividades escolares" />
      <Button type="submit" className="justify-self-start">
        Matricular estudiante
      </Button>
      {sent && (
        <p role="status" className="text-sm text-success">
          Estudiante matriculado.
        </p>
      )}
    </form>
  )
}
