import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./advanced-filter/*.tsx', { eager: true }),
  import.meta.glob('./advanced-filter/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function AdvancedFilterDoc() {
  return (
    <ComponentDoc
      slug="advanced-filter"
      description="Constructor de filtros por condiciones: campo, operador y valor, combinadas con «todas» o «alguna». Las condiciones activas se leen como frases («Promedio mayor o igual que 8») y se quitan de una en una."
      importCode={`import { AdvancedFilter, applyFilter, type FilterField, type FilterState } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        {
          name: 'Students',
          title: 'Filtrar estudiantes',
          description: <>Abre «Filtros» para cambiar las condiciones. Los operadores dependen del tipo de campo. <Code>applyFilter</Code> aplica el estado a cualquier lista.</>,
          previewClassName: 'block',
        },
      ]}
      api={[
        {
          component: 'AdvancedFilter',
          props: [
            { name: 'fields', type: 'FilterField[]', description: '{ id, label, type: text | select | number | date, options?, format? }' },
            { name: 'value', type: 'FilterState', description: '{ join: and | or, conditions: FilterCondition[] }' },
            { name: 'onChange', type: '(state: FilterState) => void', description: 'Cada cambio.' },
            { name: 'showChips', type: 'boolean', default: 'true', description: 'Muestra las condiciones activas como chips.' },
          ],
        },
        {
          component: 'Funciones',
          props: [
            { name: 'applyFilter(rows, state, getValue?)', type: 'T[]', description: 'Filtra; ignora condiciones incompletas. getValue para datos anidados.' },
            { name: 'describeCondition(condition, field)', type: 'string', description: 'La frase legible.' },
            { name: 'operatorsByType', type: 'Record', description: 'Operadores por tipo: texto (contiene, no contiene, es igual a, empieza por), selección (es, no es), número (=, >, ≥, <, ≤, entre), fecha (el día, antes, después, entre).' },
            { name: 'emptyFilter', type: 'FilterState', description: 'Estado sin condiciones.' },
          ],
        },
      ]}
      a11y={[
        'Cada control de una condición se nombra con su posición («Operador de la condición 2»).',
        'El número de condiciones activas aparece en el botón «Filtros».',
        'Cada chip tiene su botón «Quitar filtro: …» con la frase completa.',
        'El texto se compara sin mayúsculas ni tildes: «sofia» encuentra «Sofía».',
      ]}
      dos={['Muestra el número de resultados junto al filtro.', 'Ofrece solo los campos por los que tiene sentido filtrar.']}
      donts={['Para uno o dos filtros fijos, unos chips o un Select son más rápidos.']}
      limitations={['Sin grupos anidados: todas las condiciones se combinan con el mismo operador (y / o).']}
    />
  )
}
