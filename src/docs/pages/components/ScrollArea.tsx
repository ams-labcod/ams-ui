import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./scroll-area/*.tsx', { eager: true }),
  import.meta.glob('./scroll-area/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ScrollAreaDoc() {
  return (
    <ComponentDoc
      slug="scroll-area"
      description="Zona con desplazamiento propio y barras finas del color de la marca, iguales en Windows, macOS y móvil. Útil en paneles de altura fija como listas de actividad."
      importCode={`import { ScrollArea } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Notifications', title: 'Actividad reciente', description: 'Haz Tab hasta la lista y usa las flechas para desplazarla.' }]}
      api={[
        {
          component: 'ScrollArea',
          props: [
            { name: 'aria-label', type: 'string', description: 'Nombre del área; además la hace enfocable para desplazarla con el teclado.' },
            { name: 'horizontal', type: 'boolean', default: 'false', description: 'Añade barra horizontal.' },
            { name: 'type', type: "'hover' | 'scroll' | 'auto' | 'always'", default: "'hover'", description: 'Cuándo se ven las barras.' },
          ],
          extends: 'Fija la altura con className (h-72, max-h-96…).',
        },
      ]}
      a11y={['El desplazamiento es nativo: rueda, táctil y teclado funcionan.', 'Con aria-label la zona es una región enfocable; sin él, asegúrate de que tiene contenido enfocable dentro.']}
      dos={['Úsalo en paneles de altura fija dentro de la página.']}
      donts={['No lo uses para la página entera: el navegador ya se desplaza.', 'Evita desplazamientos anidados en la misma dirección.']}
    />
  )
}
