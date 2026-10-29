import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./tooltip/*.tsx', { eager: true }),
  import.meta.glob('./tooltip/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function TooltipDoc() {
  return (
    <ComponentDoc
      slug="tooltip"
      description="Texto breve que aparece al pasar el puntero o enfocar un control. Sirve para nombrar botones de icono, no para explicar procesos."
      importCode={`import { Tooltip } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'IconButtons', title: 'Botones de icono', description: 'Pasa el puntero o tabula hasta los botones. Tiene colores invertidos para separarse del vidrio.' }]}
      api={[
        {
          component: 'Tooltip',
          props: [
            { name: 'content', type: 'ReactNode', description: 'Texto del tooltip.' },
            { name: 'children', type: 'ReactElement', description: 'Un único elemento enfocable.' },
            { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Lado preferido.' },
            { name: 'delay', type: 'number', default: '300', description: 'Espera en ms antes de mostrarse.' },
          ],
        },
      ]}
      a11y={[
        'Aparece también al enfocar con teclado y se cierra con Escape.',
        'El contenido se asocia al disparador como descripción (aria-describedby).',
        'No sustituye al aria-label del botón: dale nombre propio al control.',
      ]}
      dos={['Dos a cinco palabras.', 'Úsalo en controles que no tienen texto visible.']}
      donts={['No pongas enlaces ni botones dentro: no se puede llegar a ellos.', 'No guardes ahí información imprescindible: en pantallas táctiles casi no se ve.']}
    />
  )
}
