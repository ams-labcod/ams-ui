import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./select/*.tsx', { eager: true }),
  import.meta.glob('./select/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SelectDoc() {
  return (
    <ComponentDoc
      slug="select"
      description="Elige una opción de una lista corta y conocida: curso, período, sede. La lista se abre sobre una superficie sólida con el ítem elegido marcado en turquesa."
      importCode={`import { FormField, Select } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Controlado', description: 'value y onValueChange lo controlan; defaultValue lo deja sin controlar. Las opciones pueden estar deshabilitadas.' },
        { name: 'States', title: 'Estados', description: 'Error y deshabilitado vienen de FormField, igual que en Input.' },
      ]}
      api={[
        {
          component: 'Select',
          props: [
            { name: 'options', type: 'SelectOption[]', description: '{ value: string; label: ReactNode; disabled?: boolean }' },
            { name: 'value', type: 'string', description: 'Valor controlado. "" muestra el placeholder.' },
            { name: 'defaultValue', type: 'string', description: 'Valor inicial sin controlar.' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Se llama al elegir.' },
            { name: 'placeholder', type: 'string', default: "'Selecciona una opción'", description: 'Texto sin selección.' },
            { name: 'name', type: 'string', description: 'Nombre para enviar en un <form>.' },
            { name: 'disabled, required, id, aria-label', type: '—', description: 'Se heredan de FormField si está dentro de uno.' },
          ],
        },
      ]}
      a11y={[
        'El disparador es un combobox: se abre con Enter, Espacio o las flechas.',
        'Dentro de la lista: flechas para moverse, escribir para saltar a la opción que empieza por esas letras, Enter para elegir y Escape para cerrar.',
        'El foco vuelve al disparador al cerrar.',
      ]}
      dos={['Úsalo con 4 a 15 opciones.', 'Ordena las opciones de forma predecible (alfabética o por grado).']}
      donts={['Con 2 o 3 opciones usa Radio Group (v0.2): se ven todas sin abrir nada.', 'Con muchas opciones o búsqueda usa Combobox (v0.3).']}
      limitations={['Sin grupos de opciones ni selección múltiple todavía.', 'Ningún value puede ser cadena vacía: Radix la reserva para «sin selección».']}
    />
  )
}
