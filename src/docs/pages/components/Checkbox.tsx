import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./checkbox/*.tsx', { eager: true }),
  import.meta.glob('./checkbox/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function CheckboxDoc() {
  return (
    <ComponentDoc
      slug="checkbox"
      description="Activa o desactiva una opción, o elige varias de una lista. Es un checkbox nativo con el aspecto de la marca, así que funciona en formularios sin código extra."
      importCode={`import { Checkbox } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Con etiqueta y descripción', description: 'Toda la fila (casilla y texto) responde al clic.' },
        { name: 'Indeterminate', title: 'Estado mixto', description: '«Todos» queda a medias cuando solo parte de la lista está marcada. Desmarca y marca estudiantes para verlo.' },
      ]}
      api={[
        {
          component: 'Checkbox',
          props: [
            { name: 'label', type: 'ReactNode', description: 'Texto al lado. Sin él, nombra la casilla con aria-label.' },
            { name: 'description', type: 'ReactNode', description: 'Ayuda bajo la etiqueta, asociada con aria-describedby.' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado mixto (aria-checked="mixed").' },
          ],
          extends: 'Acepta los atributos de <input type="checkbox">: checked, defaultChecked, onChange, name, value, disabled…',
        },
      ]}
      a11y={['Checkbox nativo: Espacio lo alterna y los lectores anuncian marcado, desmarcado o mixto.', 'Agrupa listas en un <fieldset> con <legend> para que se lea el nombre del grupo.']}
      dos={['Úsalo para opciones independientes o selección múltiple.', 'Redacta la etiqueta en positivo: «Enviar boletín», no «No enviar boletín».']}
      donts={['No lo uses para un ajuste que se aplica al instante: eso es un Switch.']}
    />
  )
}
