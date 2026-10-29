import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./popover/*.tsx', { eager: true }),
  import.meta.glob('./popover/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function PopoverDoc() {
  return (
    <ComponentDoc
      slug="popover"
      description="Panel flotante anclado a un botón para contenido interactivo breve: filtros, ajustes rápidos, una vista previa. No bloquea la página como un diálogo."
      importCode={`import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Filters', title: 'Filtros rápidos', description: 'Se cierra con Escape, con clic fuera o con un PopoverClose.' }]}
      api={[
        { component: 'Popover', props: [{ name: 'open, defaultOpen, onOpenChange', type: '—', description: 'Control del estado, igual que Dialog.' }] },
        {
          component: 'PopoverContent',
          props: [
            { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alineación respecto al disparador.' },
            { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Lado preferido; cambia solo si no cabe.' },
            { name: 'sideOffset', type: 'number', default: '8', description: 'Separación en px.' },
          ],
          extends: 'Acepta las props de Radix Popover.Content. Ancho por defecto 18 rem; cámbialo con className.',
        },
      ]}
      a11y={[
        'El disparador anuncia si el panel está abierto (aria-expanded).',
        'Al abrir, el foco pasa al panel; al cerrar vuelve al disparador.',
        'Ponle aria-label al contenido si no tiene un título que lo describa.',
      ]}
      dos={['Contenido corto y relacionado con el disparador.']}
      donts={['No pongas formularios largos: usa Dialog o Sheet.', 'Para una lista de acciones usa Dropdown Menu; para un texto de ayuda, Tooltip.']}
    />
  )
}
