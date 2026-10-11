import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./badge/*.tsx', { eager: true }),
  import.meta.glob('./badge/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function BadgeDoc() {
  return (
    <ComponentDoc
      slug="badge"
      description="Etiqueta corta que describe un estado o una categoría: si una nota está aprobada, a qué materia pertenece un curso o si un pago está pendiente."
      importCode={`import { Badge } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Variants', title: 'Variantes', description: 'Los colores semánticos comunican estado; accent marca categorías; solid se reserva para destacar una única opción, como el plan recomendado.' },
        { name: 'Dot', title: 'Con punto', description: 'El punto refuerza un estado. Con dot="pulse" late, como el aviso de versión de la referencia: úsalo solo para algo que está ocurriendo ahora.' },
      ]}
      api={[
        {
          component: 'Badge',
          props: [
            { name: 'variant', type: "'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'solid'", default: "'neutral'", description: 'Color y significado.' },
            { name: 'dot', type: "boolean | 'pulse'", default: 'false', description: 'Punto delante del texto; pulse lo anima.' },
          ],
          extends: 'Acepta todos los atributos de <span>.',
        },
      ]}
      a11y={[
        'Es texto plano: el significado está en las palabras, no solo en el color.',
        'El punto es decorativo (aria-hidden).',
        'La animación del punto se detiene si el sistema pide reducir movimiento.',
      ]}
      dos={['Una o dos palabras: «Aprobado», «Pago pendiente».', 'El mismo color para el mismo estado en toda la aplicación.']}
      donts={['No lo uses como botón: no es interactivo.', 'No confíes solo en el color: «Reprobado» en rojo, no un punto rojo sin texto.']}
    />
  )
}
