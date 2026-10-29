import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./form-field/*.tsx', { eager: true }),
  import.meta.glob('./form-field/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function FormFieldDoc() {
  return (
    <ComponentDoc
      slug="form-field"
      description="Une etiqueta, control, texto de ayuda y mensaje de error. El control que pongas dentro (Input, Textarea, Select, Checkbox, Switch) recibe el id, el estado de error y las descripciones sin cablear nada a mano."
      importCode={`import { FormField, Label } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Enrollment', title: 'Formulario con validación', description: 'Pulsa «Matricular estudiante» con el formulario vacío. La validación corre al enviar; los errores se muestran en cada campo y se leen al enfocarlo.' },
        { name: 'LabelOnly', title: 'Label suelto', description: <>Si la disposición no encaja en FormField, usa <Code>Label</Code> con <Code>htmlFor</Code>.</> },
      ]}
      api={[
        {
          component: 'FormField',
          props: [
            { name: 'label', type: 'ReactNode', description: 'Etiqueta visible, conectada al control.' },
            { name: 'description', type: 'ReactNode', description: 'Ayuda bajo el control. Sigue visible si hay error.' },
            { name: 'error', type: 'ReactNode', description: 'Mensaje de error; marca el control con aria-invalid.' },
            { name: 'required', type: 'boolean', description: 'Asterisco en la etiqueta y required en el control.' },
            { name: 'disabled', type: 'boolean', description: 'Deshabilita el control y atenúa la etiqueta.' },
            { name: 'id', type: 'string', description: 'id del control; por defecto se genera.' },
          ],
        },
        {
          component: 'Label',
          props: [{ name: 'required', type: 'boolean', description: 'Muestra el asterisco.' }],
          extends: 'Acepta los atributos de <label>.',
        },
        {
          component: 'useFieldControl(props)',
          props: [{ name: 'props', type: 'ControlProps', description: 'Para controles propios: devuelve las props con id, disabled, required, aria-invalid y aria-describedby del FormField.' }],
        },
      ]}
      a11y={[
        'La etiqueta apunta al control con for/id; hacer clic en ella enfoca el control.',
        'Ayuda y error se enlazan con aria-describedby: se leen al enfocar el campo.',
        'El asterisco es decorativo; el control lleva required, que es lo que anuncian los lectores.',
        'El error no usa role="alert" para no interrumpir en cada pulsación. Al enviar, mueve el foco al primer campo con error si el formulario es largo.',
      ]}
      dos={['Valida al enviar o al salir del campo.', 'Explica cómo corregir el error, no solo qué está mal.']}
      donts={['No muestres errores antes de que la persona haya intentado completar el campo.', 'No escondas la ayuda cuando aparece el error.']}
      limitations={['Formularios grandes con esquemas y validación asíncrona llegan con Form (v0.2, react-hook-form + zod).']}
    />
  )
}
