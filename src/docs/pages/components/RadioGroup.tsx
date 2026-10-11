import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./radio-group/*.tsx', { eager: true }),
  import.meta.glob('./radio-group/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function RadioGroupDoc() {
  return (
    <ComponentDoc
      slug="radio-group"
      description="Elige una sola opción de una lista corta que se ve completa. Con pocas opciones es más rápido que un Select porque no hay que abrir nada."
      importCode={`import { RadioGroup } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Vertical y horizontal', description: 'Cada opción puede llevar descripción y estar deshabilitada. El error se muestra bajo el grupo.' },
        { name: 'Cards', title: 'Tarjetas', description: 'variant="card" convierte cada opción en una tarjeta, para elegir entre opciones con más contenido, como los planes de la referencia.' },
      ]}
      api={[
        {
          component: 'RadioGroup',
          props: [
            { name: 'options', type: 'RadioOption[]', description: '{ value, label, description?, disabled? }' },
            { name: 'label', type: 'ReactNode', description: 'Nombre visible del grupo (aria-labelledby). Sin él, usa aria-label.' },
            { name: 'value, defaultValue, onValueChange', type: 'string', description: 'Opción elegida, controlada o no.' },
            { name: 'variant', type: "'default' | 'card'", default: "'default'", description: 'Círculos o tarjetas.' },
            { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Dirección de la lista y de las flechas.' },
            { name: 'description, error', type: 'ReactNode', description: 'Ayuda y error del grupo.' },
            { name: 'name, required, disabled', type: '—', description: 'Para formularios nativos.' },
          ],
        },
      ]}
      a11y={[
        'Patrón radiogroup: Tab entra en el grupo sobre la opción elegida; las flechas cambian de opción y la seleccionan.',
        'El grupo se nombra con su label y se describe con la ayuda y el error.',
        'Toda la fila (círculo y texto) responde al clic.',
      ]}
      dos={['De 2 a 5 opciones.', 'Marca una opción por defecto si hay una razonable.']}
      donts={['Con muchas opciones usa Select.', 'Para opciones que se pueden combinar usa Checkbox o ChipGroup multiple.']}
    />
  )
}
