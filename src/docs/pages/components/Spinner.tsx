import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./spinner/*.tsx', { eager: true }),
  import.meta.glob('./spinner/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SpinnerDoc() {
  return (
    <ComponentDoc
      slug="spinner"
      description="Indica que algo está en curso y no se sabe cuánto falta. El arco turquesa sobre su propio carril recuerda al anillo de asistencia de la referencia."
      importCode={`import { Spinner } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Sizes', title: 'Tamaños', description: 'Toma el color del texto con className (text-fg-subtle, text-current).' }]}
      api={[
        {
          component: 'Spinner',
          props: [
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '16, 20 o 32 px.' },
            { name: 'label', type: 'string', description: 'Lo convierte en role="status" con ese nombre. Sin label es decorativo.' },
          ],
        },
      ]}
      a11y={[
        'Con label se anuncia como estado («Cargando estudiantes»).',
        'Sin label es decorativo: úsalo así cuando hay un texto visible al lado o dentro de un botón con loading.',
        'Con movimiento reducido el giro se detiene; el arco sigue visible.',
      ]}
      dos={['Acompáñalo de un texto que diga qué se está haciendo.']}
      donts={['Si sabes el avance, usa Progress (v0.3).', 'No llenes una página de spinners: usa Skeleton para cargar contenido.']}
    />
  )
}
