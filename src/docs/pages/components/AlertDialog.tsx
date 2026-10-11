import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./alert-dialog/*.tsx', { eager: true }),
  import.meta.glob('./alert-dialog/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function AlertDialogDoc() {
  return (
    <ComponentDoc
      slug="alert-dialog"
      description="Confirmación obligatoria antes de una acción que no se puede deshacer. A diferencia de Dialog, no se cierra con clic fuera ni tiene X: hay que elegir."
      importCode={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogCancel, AlertDialogAction } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'DeletePeriod', title: 'Acción destructiva', description: 'El título pregunta, la descripción cuenta la consecuencia con cifras y el botón repite el verbo.' }]}
      api={[
        { component: 'AlertDialog', props: [{ name: 'open, defaultOpen, onOpenChange', type: '—', description: 'Control del estado.' }] },
        {
          component: 'AlertDialogContent',
          props: [
            { name: 'title', type: 'ReactNode', description: 'La pregunta.' },
            { name: 'description', type: 'ReactNode', description: 'Obligatoria: la consecuencia.' },
            { name: 'children', type: 'ReactNode', description: 'Los botones: AlertDialogCancel y AlertDialogAction.' },
          ],
        },
        { component: 'AlertDialogCancel', props: [{ name: 'children', type: 'ReactNode', default: "'Cancelar'", description: 'Recibe el foco al abrir.' }] },
        { component: 'AlertDialogAction', props: [{ name: 'variant', type: 'ButtonVariant', default: "'destructive'", description: 'Estilo del botón de confirmar.' }] },
      ]}
      a11y={[
        'role="alertdialog": los lectores anuncian que requiere respuesta.',
        'El foco va a «Cancelar» al abrir: pulsar Enter por inercia no destruye nada.',
        'Escape cancela; el clic fuera no hace nada.',
      ]}
      dos={['Úsalo solo para lo irreversible o costoso: borrar, retirar, cerrar un período.', 'Di qué se pierde, con números si los hay.']}
      donts={['No lo uses para confirmar acciones que se pueden deshacer: ofrece «Deshacer» en un toast.', 'No uses «Sí» y «No»: usa verbos.']}
    />
  )
}
