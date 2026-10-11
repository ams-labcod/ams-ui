import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./slider/*.tsx', { eager: true }),
  import.meta.glob('./slider/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SliderDoc() {
  return (
    <ComponentDoc
      slug="slider"
      description="Elige un valor o un rango arrastrando. Útil cuando importa más la posición aproximada que el número exacto, o para acotar filtros."
      importCode={`import { Slider } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Basic', title: 'Valor, rango y formato', description: 'Un número o un par [desde, hasta]. formatValue escribe el valor como corresponde: decimales, moneda…' }]}
      api={[
        {
          component: 'Slider',
          props: [
            { name: 'value, defaultValue', type: 'number | [number, number]', description: 'Un par activa el modo rango (dos asas).' },
            { name: 'onValueChange', type: '(value) => void', description: 'En cada paso.' },
            { name: 'onValueCommit', type: '(value) => void', description: 'Al soltar: úsalo para filtrar o guardar.' },
            { name: 'min, max, step', type: 'number', default: '0, 100, 1', description: 'Límites y paso.' },
            { name: 'label', type: 'string', description: 'Etiqueta visible y nombre de cada asa.' },
            { name: 'formatValue', type: '(n: number) => string', default: 'String', description: 'Texto visible y anunciado.' },
            { name: 'showBounds', type: 'boolean', default: 'false', description: 'Muestra min y max bajo la barra.' },
            { name: 'disabled, name', type: '—', description: 'Bloqueo y nombre para formularios.' },
          ],
        },
      ]}
      a11y={[
        'Cada asa es un slider: flechas mueven un paso, Re Pág/Av Pág diez pasos, Inicio/Fin a los extremos.',
        'En rango, las asas se nombran «desde» y «hasta», y no pueden cruzarse.',
        'El valor se anuncia con el mismo formato que se ve (aria-valuetext).',
      ]}
      dos={['Muestra siempre el valor actual en número.', 'Úsalo para rangos de filtro (promedio, edad, precio).']}
      donts={['Para un número exacto (una nota, un documento) es mejor un Input.']}
    />
  )
}
