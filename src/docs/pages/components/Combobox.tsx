import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./combobox/*.tsx', { eager: true }),
  import.meta.glob('./combobox/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ComboboxDoc() {
  return (
    <ComponentDoc
      slug="combobox"
      description="Select con buscador para listas largas: estudiantes, docentes, instituciones. Encuentra por nombre y por el texto secundario (grado, código)."
      importCode={`import { Combobox } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Student', title: 'Lista local', description: '48 estudiantes con búsqueda difusa; elegir de nuevo el seleccionado lo quita.' },
        { name: 'Remote', title: 'Búsqueda en el servidor', description: 'onSearch desactiva el filtro local y entrega el texto; loading muestra «Buscando…».' },
      ]}
      api={[
        {
          component: 'Combobox',
          props: [
            { name: 'options', type: 'ComboboxOption[]', description: '{ value, label, description?, disabled? }' },
            { name: 'value, defaultValue', type: 'string | null', description: 'Opción elegida.' },
            { name: 'onValueChange', type: '(value: string | null) => void', description: 'null al deseleccionar.' },
            { name: 'placeholder, searchPlaceholder', type: 'string', description: 'Textos del disparador y del buscador.' },
            { name: 'emptyMessage', type: 'ReactNode', default: "'Ningún resultado.'", description: 'Cuando la búsqueda no encuentra nada.' },
            { name: 'onSearch', type: '(query: string) => void', description: 'Búsqueda propia (servidor).' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra «Buscando…».' },
            { name: 'name, id, disabled, required', type: '—', description: 'Formularios y FormField.' },
          ],
        },
      ]}
      a11y={[
        'El disparador es un combobox con aria-expanded; al abrir, el foco va al buscador.',
        'Las flechas recorren los resultados (con vuelta al final), Enter elige y Escape cierra devolviendo el foco.',
        'Se conecta con FormField: etiqueta, ayuda y error.',
      ]}
      dos={['Úsalo a partir de unas 15 opciones.', 'Añade description con lo que la gente usa para distinguir (grado, código).']}
      donts={['Con pocas opciones, un Select es más directo.']}
      limitations={['Una sola opción: sin selección múltiple todavía.']}
    />
  )
}
