import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./chips/*.tsx', { eager: true }),
  import.meta.glob('./chips/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ChipsDoc() {
  return (
    <ComponentDoc
      slug="chips"
      description="Píldoras compactas para filtrar o etiquetar. ChipGroup elige una o varias opciones; Chip muestra un valor que se puede quitar, como un filtro activo."
      importCode={`import { Chip, ChipGroup } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Filters', title: 'Selección múltiple y filtros activos', description: 'Los chips de abajo reflejan la selección y permiten quitarla una a una.' },
        { name: 'Single', title: 'Selección única', description: 'Sin multiple, se comporta como un interruptor de opciones: al elegir una se desmarca la anterior.' },
      ]}
      api={[
        {
          component: 'ChipGroup',
          props: [
            { name: 'options', type: 'ChipOption[]', description: '{ value, label, icon?, disabled? }' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite varias opciones; value pasa a ser string[].' },
            { name: 'value, defaultValue, onValueChange', type: 'string | string[]', description: 'Selección, controlada o no.' },
            { name: 'aria-label, aria-labelledby', type: 'string', description: 'Nombre del grupo.' },
          ],
        },
        {
          component: 'Chip',
          props: [
            { name: 'onRemove', type: '() => void', description: 'Muestra la X de quitar.' },
            { name: 'removeLabel', type: 'string', description: 'Nombre del botón de quitar; por defecto «Quitar <texto>».' },
          ],
          extends: 'Acepta los atributos de <span>.',
        },
      ]}
      a11y={[
        'Cada chip seleccionable es un botón con aria-pressed: los lectores anuncian «presionado».',
        'Las flechas se mueven entre chips del grupo; Tab sale del grupo.',
        'El botón de quitar tiene su propio nombre («Quitar Física»).',
      ]}
      dos={['Etiquetas de una o dos palabras.', 'Úsalos para filtrar listas que se actualizan al momento.']}
      donts={['No los uses como navegación: para eso están las pestañas.', 'Más de 10 opciones: usa Combobox.']}
    />
  )
}
