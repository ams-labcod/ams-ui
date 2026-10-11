import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./empty-state/*.tsx', { eager: true }),
  import.meta.glob('./empty-state/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function EmptyStateDoc() {
  return (
    <ComponentDoc
      slug="empty-state"
      description="Ocupa el lugar de una lista o tabla sin datos. Explica por qué está vacía y ofrece la acción para llenarla. El icono usa el mismo marco que las tarjetas de características de la referencia."
      importCode={`import { EmptyState } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'NoStudents', title: 'Primer uso', description: 'Cuando todavía no hay nada: invita a crear el primer registro.' },
        { name: 'NoResults', title: 'Sin resultados', description: 'Cuando un filtro o búsqueda no encuentra nada: repite lo que se buscó y ofrece salir.' },
      ]}
      api={[
        {
          component: 'EmptyState',
          props: [
            { name: 'title', type: 'ReactNode', description: 'Qué pasa, en una frase. Se renderiza como <h3>.' },
            { name: 'description', type: 'ReactNode', description: 'Qué puede hacer la persona.' },
            { name: 'icon', type: 'ReactNode', description: 'Icono de lucide-react.' },
            { name: 'action', type: 'ReactNode', description: 'Botones para salir del estado vacío.' },
          ],
          extends: 'Acepta los atributos de <div>.',
        },
      ]}
      a11y={['El título es un <h3>; si rompe la jerarquía de tu página, ajústalo en tu propio componente.', 'El icono es decorativo.']}
      dos={['Distingue «aún no hay datos» de «tu filtro no encontró nada».', 'Ofrece siempre un siguiente paso.']}
      donts={['No escribas solo «No hay datos».', 'No uses ilustraciones grandes: el icono basta.']}
      limitations={['El nivel del título es fijo (h3).']}
    />
  )
}
