import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./separator/*.tsx', { eager: true }),
  import.meta.glob('./separator/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SeparatorDoc() {
  return (
    <ComponentDoc
      slug="separator"
      description="Línea fina para separar grupos de contenido, con el mismo borde translúcido que las tarjetas de vidrio."
      importCode={`import { Separator } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Usage', title: 'Horizontal y vertical', description: 'El separador vertical se estira a la altura de su fila.' }]}
      api={[
        {
          component: 'Separator',
          props: [
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Dirección de la línea.' },
            { name: 'decorative', type: 'boolean', default: 'false', description: 'Solo visual: no se anuncia.' },
          ],
          extends: 'Acepta los atributos de <div>.',
        },
      ]}
      a11y={['Por defecto es role="separator" y los lectores lo anuncian como un cambio de sección.', 'Marca decorative cuando solo adorna (p. ej. entre datos de una misma fila).']}
      dos={['Úsalo cuando el espacio no basta para separar.']}
      donts={['No lo pongas entre cada elemento de una lista: el espaciado ya los separa.']}
    />
  )
}
