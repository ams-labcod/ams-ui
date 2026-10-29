import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./hover-card/*.tsx', { eager: true }),
  import.meta.glob('./hover-card/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function HoverCardDoc() {
  return (
    <ComponentDoc
      slug="hover-card"
      description="Vista previa que aparece al pasar el puntero o enfocar un enlace: la ficha de un docente, el resumen de un curso. Adelanta información sin obligar a abrir la página."
      importCode={`import { HoverCard, HoverCardTrigger, HoverCardContent } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Teacher', title: 'Ficha de una persona', description: 'Pasa el puntero o tabula hasta el nombre.' }]}
      api={[
        {
          component: 'HoverCard',
          props: [
            { name: 'openDelay', type: 'number', default: '400', description: 'Espera antes de abrir, en ms.' },
            { name: 'closeDelay', type: 'number', default: '150', description: 'Espera antes de cerrar.' },
          ],
        },
        { component: 'HoverCardContent', props: [{ name: 'align, side, sideOffset', type: '—', description: 'Posición, como en Popover.' }] },
      ]}
      a11y={[
        'Se abre también al enfocar el enlace con el teclado.',
        'Su contenido no es alcanzable por teclado ni lo anuncian los lectores: todo lo que muestra debe estar también en la página de destino.',
      ]}
      dos={['Úsalo sobre enlaces que llevan a la ficha completa.']}
      donts={['No pongas botones ni información exclusiva dentro.', 'En táctil no aparece: no dependas de él.']}
    />
  )
}
