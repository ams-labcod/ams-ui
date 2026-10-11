import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Alert, Button, Checkbox, DatePicker, Form, FormItem, Input, RadioGroup, Select, toast } from '@ams/ui'

const schema = z.object({
  name: z.string().trim().min(3, 'Escribe el nombre completo (mínimo 3 letras).'),
  document: z.string().regex(/^\d{6,10}$/, 'El documento son de 6 a 10 dígitos, sin puntos.'),
  grade: z.string().min(1, 'Elige el grado.'),
  birth: z.date({ error: 'Elige la fecha de nacimiento.' }).max(new Date(), 'La fecha no puede ser futura.'),
  shift: z.enum(['manana', 'tarde']),
  photos: z.boolean(),
})

type Student = z.infer<typeof schema>

// Simula el servidor: el documento 1234567 ya existe.
const save = (s: Student) => new Promise<void>((ok, fail) => setTimeout(() => (s.document === '1234567' ? fail(new Error('dup')) : ok()), 900))

export default function StudentForm() {
  const form = useForm<Student>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', document: '', grade: '', shift: 'manana', photos: false },
  })

  async function onSubmit(values: Student) {
    try {
      await save(values)
      toast.success('Estudiante matriculado', { description: `${values.name} ya aparece en las listas de su curso.` })
      form.reset()
    } catch {
      form.setError('document', { message: 'Ya hay un estudiante con este documento.' })
    }
  }

  const { errors, submitCount } = form.formState
  const showSummary = submitCount > 0 && Object.keys(errors).length > 1

  return (
    <Form form={form} onSubmit={onSubmit} className="grid w-full max-w-lg gap-5">
      {showSummary && <Alert variant="danger" title="Revisa los campos marcados en rojo" />}
      <FormItem<Student, 'name'> name="name" label="Nombre completo" required>
        {(field) => <Input {...field} autoComplete="name" />}
      </FormItem>
      <FormItem<Student, 'document'> name="document" label="Documento de identidad" description="Prueba con 1234567 para ver un error del servidor." required>
        {(field) => <Input {...field} inputMode="numeric" />}
      </FormItem>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormItem<Student, 'grade'> name="grade" label="Grado" required>
          {(field) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: '6', label: 'Sexto' },
                { value: '7', label: 'Séptimo' },
                { value: '8', label: 'Octavo' },
              ]}
            />
          )}
        </FormItem>
        <FormItem<Student, 'birth'> name="birth" label="Fecha de nacimiento" required>
          {(field) => <DatePicker value={field.value ?? null} onChange={(d) => field.onChange(d ?? undefined)} max={new Date()} />}
        </FormItem>
      </div>
      <RadioGroup
        label="Jornada"
        orientation="horizontal"
        value={form.watch('shift')}
        onValueChange={(v) => form.setValue('shift', v as Student['shift'])}
        options={[
          { value: 'manana', label: 'Mañana' },
          { value: 'tarde', label: 'Tarde' },
        ]}
      />
      <Checkbox label="Autorizo el uso de fotografías en actividades escolares" {...form.register('photos')} />
      <Button type="submit" loading={form.formState.isSubmitting} className="justify-self-start">
        Matricular estudiante
      </Button>
    </Form>
  )
}
