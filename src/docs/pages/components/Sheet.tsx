import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./sheet/*.tsx', { eager: true }),
  import.meta.glob('./sheet/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SheetDoc() {
  return (
    <ComponentDoc
      slug="sheet"
      description="Panel que entra desde un borde de la pantalla. Muestra el detalle de un registro o un formulario largo sin salir de la lista, que sigue visible detrás."
      importCode={`import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'StudentDetail', title: 'Ficha de un registro', description: 'Cabecera y pie fijos; solo el contenido se desplaza.' },
        { name: 'Sides', title: 'Posiciones' },
      ]}
      api={[
        { component: 'Sheet', props: [{ name: 'open, defaultOpen, onOpenChange', type: '—', description: 'Igual que Dialog.' }] },
        {
          component: 'SheetContent',
          props: [
            { name: 'title', type: 'ReactNode', description: 'Obligatorio: nombre accesible.' },
            { name: 'description', type: 'ReactNode', description: 'Subtítulo bajo el título.' },
            { name: 'side', type: "'right' | 'left' | 'top' | 'bottom'", default: "'right'", description: 'Borde desde el que entra.' },
            { name: 'footer', type: 'ReactNode', description: 'Acciones fijas al pie.' },
          ],
          extends: 'Acepta las props de Radix Dialog.Content. Ancho por defecto 28 rem en los laterales.',
        },
      ]}
      a11y={['Es un diálogo modal: foco atrapado, Escape para cerrar y retorno del foco al disparador.', 'Título y descripción se anuncian al abrir.']}
      dos={['Úsalo para ver o editar un registro sin perder la lista.', 'Pon las acciones en el pie para que estén siempre visibles.']}
      donts={['No lo uses para confirmaciones cortas: eso es un Dialog.', 'No abras un panel desde otro.']}
    />
  )
}
