import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./breadcrumb/*.tsx', { eager: true }),
  import.meta.glob('./breadcrumb/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function BreadcrumbDoc() {
  return (
    <ComponentDoc
      slug="breadcrumb"
      description="Muestra dónde está la persona dentro de la jerarquía (sede, curso, materia) y le permite volver a cualquier nivel."
      importCode={`import { Breadcrumb } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Paths', title: 'Corta y larga', description: 'El último nivel es la página actual y no es enlace.' }]}
      api={[
        {
          component: 'Breadcrumb',
          props: [
            { name: 'items', type: 'BreadcrumbItem[]', description: '{ label, href? } de la raíz a la página actual.' },
            { name: 'maxItems', type: 'number', default: '4', description: 'A partir de aquí se colapsan los niveles intermedios.' },
            { name: 'linkComponent', type: 'ComponentType<{ href, className, children }>', description: <>El enlace de tu router, por ejemplo <Code>Link</Code> de react-router.</> },
          ],
        },
      ]}
      a11y={[
        'Es un <nav> llamado «Ruta de navegación» con una lista ordenada.',
        'La página actual lleva aria-current="page".',
        'Los separadores son decorativos; los niveles ocultos se anuncian («2 niveles intermedios»).',
      ]}
      dos={['Úsalo en vistas con tres o más niveles de profundidad.']}
      donts={['No lo uses como navegación principal.', 'No repitas el título de la página justo debajo con las mismas palabras.']}
      limitations={['Los niveles colapsados no se pueden abrir: se ven al pasar el puntero (title).']}
    />
  )
}
