import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./context-menu/*.tsx', { eager: true }),
  import.meta.glob('./context-menu/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ContextMenuDoc() {
  return (
    <ComponentDoc
      slug="context-menu"
      description="Menú que aparece con clic derecho sobre un elemento. Un atajo para usuarios frecuentes: las mismas acciones deben estar también en un botón visible."
      importCode={`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuSeparator,
} from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'FileCard', title: 'Acciones de un archivo', description: 'Comparte estilos y API de ítem con Dropdown Menu.' }]}
      api={[
        { component: 'ContextMenuTrigger', props: [{ name: 'disabled', type: 'boolean', description: 'Deja el menú nativo del navegador.' }], extends: 'Es el área que responde al clic derecho.' },
        {
          component: 'ContextMenuItem',
          props: [
            { name: 'onSelect', type: '(event: Event) => void', description: 'Acción del ítem.' },
            { name: 'icon, shortcut, destructive, disabled', type: '—', description: 'Igual que DropdownMenuItem.' },
          ],
        },
      ]}
      a11y={[
        'Con teclado se abre con Mayús+F10 o la tecla de menú; las flechas recorren los ítems y Escape cierra.',
        'Como no se descubre a simple vista, ofrece las mismas acciones en un botón visible (por ejemplo, un Dropdown Menu en la fila).',
      ]}
      dos={['Úsalo en elementos donde el clic derecho es natural: archivos, filas, tarjetas.']}
      donts={['No guardes acciones solo aquí.', 'No lo pongas sobre texto que la gente quiera copiar: anula el menú nativo.']}
    />
  )
}
