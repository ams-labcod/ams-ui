import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./tabs/*.tsx', { eager: true }),
  import.meta.glob('./tabs/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function TabsDoc() {
  return (
    <ComponentDoc
      slug="tabs"
      description="Divide una vista en secciones del mismo nivel y muestra una a la vez. La pestaña activa se marca como el ítem activo del panel de la referencia: fondo turquesa suave y borde."
      importCode={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Course', title: 'Secciones de un curso', description: 'Usa las flechas para cambiar de pestaña. La de Pagos está deshabilitada.' }]}
      api={[
        {
          component: 'Tabs',
          props: [
            { name: 'value, defaultValue, onValueChange', type: 'string', description: 'Pestaña activa, controlada o no.' },
            { name: 'activationMode', type: "'automatic' | 'manual'", default: "'automatic'", description: 'manual: las flechas mueven el foco y Enter activa. Úsalo si cargar un panel es costoso.' },
          ],
          extends: 'Raíz de Radix Tabs.',
        },
        { component: 'TabsList', props: [{ name: 'aria-label', type: 'string', description: 'Nombre del grupo de pestañas.' }] },
        { component: 'TabsTrigger', props: [{ name: 'value', type: 'string', description: 'Identifica el panel.' }, { name: 'disabled', type: 'boolean', description: 'Se ve pero no se activa.' }] },
        { component: 'TabsContent', props: [{ name: 'value', type: 'string', description: 'Panel de la pestaña con el mismo value.' }] },
      ]}
      a11y={[
        'Patrón tablist de WAI-ARIA: Tab entra en la lista, las flechas cambian de pestaña e Inicio y Fin van a los extremos.',
        'Cada panel se enlaza con su pestaña (aria-controls y aria-labelledby).',
        'Nombra la lista con aria-label.',
      ]}
      dos={['De dos a seis pestañas con nombres cortos.', 'Secciones independientes entre sí.']}
      donts={['No las uses para pasos de un proceso: el orden importa y debe verse.', 'No anides pestañas dentro de pestañas.']}
      limitations={['Una sola variante (píldora). En móvil la lista se desplaza en horizontal si no cabe.']}
    />
  )
}
