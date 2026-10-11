import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./skeleton/*.tsx', { eager: true }),
  import.meta.glob('./skeleton/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SkeletonDoc() {
  return (
    <ComponentDoc
      slug="skeleton"
      description="Silueta del contenido mientras carga. Mantiene la forma de la página para que nada salte cuando llegan los datos."
      importCode={`import { Skeleton } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'StudentCard', title: 'Tarjeta de estudiante', description: 'Imita el avatar y las dos líneas de texto que vendrán.' }]}
      api={[{ component: 'Skeleton', props: [{ name: 'className', type: 'string', description: 'Tamaño y forma (h-4 w-1/2, size-14 rounded-full…).' }], extends: 'Acepta los atributos de <div>.' }]}
      a11y={[
        'Es decorativo (aria-hidden). Marca el contenedor con aria-busy y añade un texto oculto («Cargando estudiante»).',
        'El pulso se detiene si el sistema pide reducir movimiento.',
      ]}
      dos={['Reproduce la forma real del contenido.', 'Úsalo para cargas de más de 300 ms.']}
      donts={['No lo uses en acciones del usuario (guardar, enviar): ahí va el estado loading del botón.']}
    />
  )
}
