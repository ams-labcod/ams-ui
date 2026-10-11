import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./command/*.tsx', { eager: true }),
  import.meta.glob('./command/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function CommandDoc() {
  return (
    <ComponentDoc
      slug="command"
      description="Buscador de acciones y destinos que se maneja con el teclado. La búsqueda de esta documentación (Ctrl K) está hecha con él."
      importCode={`import {
  Command, CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem, CommandSeparator,
} from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Palette', title: 'Paleta en un diálogo', description: 'Escribe «notas»: encuentra «Calificaciones» por sus keywords. Las flechas recorren los resultados y Enter ejecuta.' },
        { name: 'Inline', title: 'Dentro de la página', description: 'Sin diálogo, como lista filtrable.' },
      ]}
      api={[
        {
          component: 'Command',
          props: [
            { name: 'label', type: 'string', description: 'Nombre accesible del buscador.' },
            { name: 'filter', type: '(value, search, keywords) => number', description: 'Sustituye el filtro difuso por defecto.' },
            { name: 'shouldFilter', type: 'boolean', default: 'true', description: 'false si filtras tú (p. ej. en el servidor).' },
            { name: 'loop', type: 'boolean', default: 'false (true en CommandDialog)', description: 'Las flechas dan la vuelta al llegar al final.' },
          ],
          extends: 'Raíz de cmdk.',
        },
        {
          component: 'CommandDialog',
          props: [
            { name: 'open, onOpenChange', type: '—', description: 'Estado del diálogo. El atajo de teclado lo pones tú.' },
            { name: 'title', type: 'string', default: "'Buscar'", description: 'Nombre accesible (oculto).' },
          ],
        },
        {
          component: 'CommandItem',
          props: [
            { name: 'onSelect', type: '(value: string) => void', description: 'Con Enter o clic.' },
            { name: 'keywords', type: 'string[]', description: 'Sinónimos que también encuentran el ítem.' },
            { name: 'icon, shortcut', type: 'ReactNode, string', description: 'Icono y atajo informativo.' },
            { name: 'disabled', type: 'boolean', description: 'Visible pero no ejecutable.' },
          ],
        },
        { component: 'CommandGroup', props: [{ name: 'heading', type: 'ReactNode', description: 'Título del grupo.' }] },
      ]}
      a11y={[
        'El campo es un combobox que controla una lista (listbox); el ítem activo se anuncia con aria-activedescendant mientras el foco sigue en el campo.',
        'Flechas para moverse, Enter para ejecutar, Escape cierra el diálogo.',
        'El estado vacío se muestra en el lugar de la lista.',
      ]}
      dos={['Nombres de acciones con verbo: «Matricular estudiante».', 'Añade keywords con los sinónimos que usa la gente.']}
      donts={['No sustituyas la navegación visible por la paleta: es un atajo, no el único camino.']}
    />
  )
}
