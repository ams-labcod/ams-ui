import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./collapsible/*.tsx', { eager: true }),
  import.meta.glob('./collapsible/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function CollapsibleDoc() {
  return (
    <ComponentDoc
      slug="collapsible"
      description="Muestra u oculta un bloque de detalle bajo su resumen. Es la pieza básica del acordeón (v0.3), que coordina varios."
      importCode={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Details', title: 'Detalle de un pago', description: 'El contenido se despliega con una animación de altura que se desactiva con movimiento reducido.' }]}
      api={[
        { component: 'Collapsible', props: [{ name: 'open, defaultOpen, onOpenChange', type: '—', description: 'Estado, controlado o no.' }, { name: 'disabled', type: 'boolean', description: 'Impide abrir o cerrar.' }] },
        { component: 'CollapsibleTrigger', props: [{ name: 'asChild', type: 'boolean', description: 'Usa tu propio botón.' }] },
        { component: 'CollapsibleContent', props: [{ name: 'forceMount', type: 'boolean', description: 'Mantiene el contenido en el DOM cerrado (p. ej. para buscarlo con Ctrl+F).' }] },
      ]}
      a11y={['El disparador es un botón con aria-expanded y aria-controls.', 'El contenido cerrado sale del DOM: no se lee ni se tabula.', 'El icono de flecha es decorativo; el estado lo anuncia aria-expanded.']}
      dos={['El resumen debe bastar para decidir si abrir.']}
      donts={['No escondas información imprescindible para completar una tarea.']}
    />
  )
}
