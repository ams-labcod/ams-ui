import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./stat/*.tsx', { eager: true }),
  import.meta.glob('./stat/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function StatDoc() {
  return (
    <ComponentDoc
      slug="stat"
      description="Cifra clave con su etiqueta y su variación respecto a un periodo, como las cifras del hero y la banda de estadísticas de la referencia. Es la pieza básica de un panel."
      importCode={`import { Stat } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Kpis', title: 'Indicadores', description: 'La variación se pinta según si subir es bueno: más inasistencias va en rojo aunque la flecha suba.', previewClassName: 'block' }]}
      api={[
        {
          component: 'Stat',
          props: [
            { name: 'label', type: 'string', description: 'Qué se mide, en sentence case.' },
            { name: 'value', type: 'ReactNode', description: 'La cifra ya formateada: «1.284», «94,6 %».' },
            { name: 'delta', type: 'StatDelta', description: '{ value, direction: up | down | flat, upIsGood?, label? }' },
            { name: 'aside', type: 'ReactNode', description: 'Visual a la derecha, como un ProgressRing.' },
          ],
        },
      ]}
      a11y={['La dirección de la variación se anuncia con texto («Sube», «Baja»), no solo con la flecha y el color.', 'Escribe la cifra con el formato del idioma: los lectores la leen como número.']}
      dos={['Una cifra por tarjeta y siempre con su periodo de comparación.', 'Agrupa de 2 a 4 en una Grid.']}
      donts={['No uses decimales que no aportan: «94,6 %» sí, «94,617 %» no.']}
    />
  )
}
