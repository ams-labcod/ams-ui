import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./textarea/*.tsx', { eager: true }),
  import.meta.glob('./textarea/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function TextareaDoc() {
  return (
    <ComponentDoc
      slug="textarea"
      description="Campo de texto de varias líneas para observaciones, mensajes a acudientes o justificaciones. Comparte estilos y estados con Input."
      importCode={`import { FormField, Textarea } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Con contador', description: 'Un contador en la descripción ayuda cuando hay un límite de caracteres.' },
        { name: 'Required', title: 'Requerido con error' },
      ]}
      api={[
        {
          component: 'Textarea',
          props: [{ name: 'rows', type: 'number', default: '4', description: 'Altura inicial en líneas. Se puede redimensionar en vertical.' }],
          extends: 'Acepta todos los atributos de <textarea> y se conecta con FormField igual que Input.',
        },
      ]}
      a11y={['Igual que Input: etiqueta visible, aria-invalid y mensaje de error asociado.', 'maxLength impide pasarse; muestra el contador para que el límite no sorprenda.']}
      dos={['Úsalo cuando la respuesta pueda ocupar más de una línea.']}
      donts={['No lo uses para datos cortos y estructurados (nombres, códigos).']}
    />
  )
}
