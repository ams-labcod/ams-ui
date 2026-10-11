import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./accordion/*.tsx', { eager: true }),
  import.meta.glob('./accordion/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function AccordionDoc() {
  return (
    <ComponentDoc
      slug="accordion"
      description="Lista de secciones plegables. Reproduce las preguntas frecuentes de la referencia: tarjetas de vidrio, un «+» turquesa que gira al abrir y un fondo turquesa tenue en la abierta."
      importCode={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Faq', title: 'Preguntas frecuentes', description: 'type="single" con collapsible: una abierta a la vez y se puede cerrar. Con type="multiple" se abren varias.' }]}
      api={[
        {
          component: 'Accordion',
          props: [
            { name: 'type', type: "'single' | 'multiple'", description: 'Una sección abierta o varias.' },
            { name: 'collapsible', type: 'boolean', description: 'En single, permite cerrar la abierta.' },
            { name: 'value, defaultValue, onValueChange', type: 'string | string[]', description: 'Secciones abiertas (string[] en multiple).' },
          ],
          extends: 'Raíz de Radix Accordion.',
        },
        { component: 'AccordionItem', props: [{ name: 'value', type: 'string', description: 'Identifica la sección.' }, { name: 'disabled', type: 'boolean', description: 'No se puede abrir.' }] },
        { component: 'AccordionTrigger / AccordionContent', props: [{ name: '—', type: '—', description: 'Pregunta (dentro de un encabezado) y respuesta.' }] },
      ]}
      a11y={[
        'Cada pregunta es un botón dentro de un encabezado, con aria-expanded.',
        'Flechas arriba/abajo saltan entre preguntas; Inicio y Fin van a la primera y la última.',
        'La animación de altura se desactiva con movimiento reducido.',
      ]}
      dos={['Preguntas cortas, respuestas de un párrafo.']}
      donts={['No escondas en acordeones pasos que hay que completar en orden.', 'No anides acordeones.']}
    />
  )
}
