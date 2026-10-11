import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./form/*.tsx', { eager: true }),
  import.meta.glob('./form/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function FormDoc() {
  return (
    <ComponentDoc
      slug="form"
      description="Formularios con esquema: react-hook-form gestiona el estado y zod define las reglas y los mensajes. FormItem conecta cada campo con su error sin código repetido."
      importCode={`import { Form, FormItem } from '@ams/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'`}
      examples={examples}
      sections={[
        {
          name: 'StudentForm',
          title: 'Matrícula con validación',
          description: (
            <>
              Envía el formulario vacío: el foco salta al primer error. Con datos válidos aparece un toast; con el documento 1234567 el servidor responde con error y se muestra en su campo con <Code>form.setError</Code>.
            </>
          ),
          previewClassName: 'justify-start',
        },
      ]}
      api={[
        {
          component: 'Form',
          props: [
            { name: 'form', type: 'UseFormReturn<T>', description: 'Resultado de useForm().' },
            { name: 'onSubmit', type: 'SubmitHandler<T>', description: 'Solo se llama con datos válidos. Si devuelve una promesa, formState.isSubmitting es true mientras dura.' },
          ],
          extends: 'Acepta los atributos de <form>. Añade noValidate: los mensajes salen del esquema.',
        },
        {
          component: 'FormItem',
          props: [
            { name: 'name', type: 'FieldPath<T>', description: 'Campo del esquema.' },
            { name: 'children', type: '(field) => ReactNode', description: 'Recibe value, onChange, onBlur, name y ref. Pásalos al control.' },
            { name: 'label, description, required, disabled', type: '—', description: 'Igual que FormField.' },
          ],
        },
      ]}
      a11y={[
        'Hereda todo de FormField: etiqueta, aria-invalid y error asociado.',
        'Al enviar con errores, react-hook-form enfoca el primer campo inválido (si el control recibe ref).',
        'El botón de envío anuncia que está ocupado mientras se guarda (loading).',
      ]}
      dos={['Mensajes de error en el esquema, escritos para la persona: «El documento son de 6 a 10 dígitos».', 'Muestra los errores del servidor en el campo afectado con setError.']}
      donts={['No dupliques reglas en el esquema y en el componente.', 'No deshabilites el botón de enviar mientras el formulario es inválido: la persona no sabría por qué.']}
      limitations={[
        'Select y DatePicker no reciben ref: el foco automático no llega a ellos.',
        'Para checkboxes basta form.register; para controles con onValueChange usa FormItem o setValue.',
      ]}
    />
  )
}
