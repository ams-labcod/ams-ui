import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./dropdown-menu/*.tsx', { eager: true }),
  import.meta.glob('./dropdown-menu/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function DropdownMenuDoc() {
  return (
    <ComponentDoc
      slug="dropdown-menu"
      description="Lista de acciones que se abre desde un botón. Agrupa acciones secundarias para que la interfaz no se llene de botones, por ejemplo en cada fila de una tabla."
      importCode={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'RowActions', title: 'Acciones de una fila', description: 'Etiqueta con el nombre del registro, ítem deshabilitado y acción destructiva separada al final.' }]}
      api={[
        { component: 'DropdownMenu', props: [{ name: 'open, defaultOpen, onOpenChange', type: '—', description: 'Control del estado.' }] },
        {
          component: 'DropdownMenuContent',
          props: [
            { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Alineación respecto al disparador.' },
            { name: 'sideOffset', type: 'number', default: '6', description: 'Separación en px.' },
          ],
        },
        {
          component: 'DropdownMenuItem',
          props: [
            { name: 'onSelect', type: '(event: Event) => void', description: 'Acción del ítem. El menú se cierra después.' },
            { name: 'icon', type: 'ReactNode', description: 'Icono a la izquierda.' },
            { name: 'shortcut', type: 'string', description: 'Atajo, solo informativo.' },
            { name: 'destructive', type: 'boolean', default: 'false', description: 'Color de peligro.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Visible pero no seleccionable.' },
          ],
        },
        { component: 'DropdownMenuLabel / DropdownMenuSeparator / DropdownMenuGroup', props: [{ name: '—', type: '—', description: 'Título de sección, línea divisoria y agrupación.' }] },
      ]}
      a11y={[
        'Enter, Espacio o Flecha abajo lo abren; las flechas recorren los ítems y escribir salta al que empieza por esa letra.',
        'Escape lo cierra y devuelve el foco al disparador.',
        'Los ítems deshabilitados se anuncian como tales y se saltan al navegar.',
        'Si el disparador es solo un icono, su aria-label debe decir de qué registro son las acciones.',
      ]}
      dos={['Ordena por frecuencia y deja lo destructivo al final, separado.', 'Ítems con verbo: «Editar datos», «Retirar del curso».']}
      donts={['No escondas en el menú la acción principal de la vista.', 'Más de 8 ítems: agrúpalos con etiquetas o replantea la vista.']}
      limitations={['Sin ítems de casilla o de radio ni submenús todavía.']}
    />
  )
}
