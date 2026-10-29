import { Button, type ButtonSize, type ButtonVariant } from '@ams-labcod/ams-ui'
import { ComponentDoc, jsx, loadExamples, Playground } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./button/*.tsx', { eager: true }),
  import.meta.glob('./button/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

const defaults = { variant: 'primary', size: 'md', loading: false, disabled: false }

export default function ButtonDoc() {
  return (
    <ComponentDoc
      slug="button"
      description="Lanza una acción. El primario lleva el degradado turquesa de la marca y se reserva para la acción principal de cada vista; el resto de botones la acompañan sin competir con ella."
      importCode={`import { Button } from '@ams-labcod/ams-ui'`}
      examples={examples}
      playground={
        <Playground
          controls={[
            { prop: 'variant', label: 'Variante', type: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'], initial: 'primary' },
            { prop: 'size', label: 'Tamaño', type: 'select', options: ['sm', 'md', 'lg'], initial: 'md' },
            { prop: 'children', label: 'Texto', type: 'text', initial: 'Guardar calificaciones' },
            { prop: 'loading', label: 'Cargando', type: 'boolean', initial: false },
            { prop: 'disabled', label: 'Deshabilitado', type: 'boolean', initial: false },
          ]}
          render={(v) => (
            <Button variant={v.variant as ButtonVariant} size={v.size as ButtonSize} loading={v.loading === true} disabled={v.disabled === true}>
              {String(v.children)}
            </Button>
          )}
          code={({ children, ...v }) => jsx('Button', v, defaults, String(children))}
        />
      }
      sections={[
        { name: 'Variants', title: 'Variantes', description: 'primary para la acción principal, secondary (vidrio) para la alternativa, outline y ghost para acciones de menor peso, destructive para lo que no se puede deshacer y link para navegar dentro de un texto.' },
        { name: 'Sizes', title: 'Tamaños', description: 'Comparten altura con los campos (36, 44 y 52 px). Los botones de solo icono necesitan aria-label.' },
        { name: 'States', title: 'Estados', description: 'loading muestra un spinner, bloquea el botón y lo anuncia como ocupado. Pulsa «Guardar» para verlo.' },
        { name: 'WithIcons', title: 'Con iconos y como enlace', description: <>Con <Code>asChild</Code> el estilo pasa al hijo, por ejemplo a un <Code>{'<a>'}</Code>. La flecha que se desplaza al pasar el puntero es la de la referencia.</> },
      ]}
      api={[
        {
          component: 'Button',
          props: [
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: "'primary'", description: 'Peso visual de la acción.' },
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'", default: "'md'", description: 'Altura y relleno. icon e icon-sm son cuadrados.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Spinner, deshabilitado y aria-busy.' },
            { name: 'asChild', type: 'boolean', default: 'false', description: 'Aplica el estilo al único hijo en vez de crear un <button>.' },
          ],
          extends: 'Acepta todos los atributos de <button>. type vale "button" por defecto, así que no envía formularios sin querer. Para fuera de React: buttonClass({ variant, size }).',
        },
      ]}
      a11y={[
        'Es un <button> nativo: se activa con Enter y Espacio y entra en el orden de tabulación.',
        'Los botones de solo icono necesitan aria-label: el icono no tiene texto.',
        'loading deshabilita el botón y añade aria-busy="true". Cambia también el texto («Guardando…») para que el cambio se anuncie.',
        'Con asChild y disabled, el hijo recibe aria-disabled y deja de recibir el puntero; un enlace deshabilitado sigue siendo enfocable.',
      ]}
      dos={[
        'Un solo botón primary por vista o por diálogo.',
        'Textos que dicen qué pasa: «Guardar calificaciones», no «Aceptar».',
        'destructive solo para acciones que borran o no se pueden deshacer, y acompañado de una confirmación.',
      ]}
      donts={[
        'No uses link para acciones: si no navega, es un botón.',
        'No pongas dos primary juntos: la persona no sabe cuál es el principal.',
        'No escondas el texto de un botón importante detrás de un icono solo.',
      ]}
    />
  )
}
