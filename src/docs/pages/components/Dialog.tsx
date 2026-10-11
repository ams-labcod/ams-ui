import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./dialog/*.tsx', { eager: true }),
  import.meta.glob('./dialog/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function DialogDoc() {
  return (
    <ComponentDoc
      slug="dialog"
      description="Ventana sobre la página que pide una decisión o un dato sin perder el contexto. Mientras está abierta, el resto de la página queda inerte."
      importCode={`import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Confirm', title: 'Confirmación', description: 'El título es la pregunta y la descripción cuenta la consecuencia. El botón final repite el verbo del disparador.' },
        { name: 'Form', title: 'Con formulario', description: 'Controlado con open y onOpenChange para cerrarlo cuando termina el guardado.' },
      ]}
      api={[
        {
          component: 'Dialog',
          props: [
            { name: 'open', type: 'boolean', description: 'Estado controlado.' },
            { name: 'defaultOpen', type: 'boolean', description: 'Estado inicial sin controlar.' },
            { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Se llama al abrir o cerrar.' },
          ],
          extends: 'Raíz de Radix Dialog.',
        },
        {
          component: 'DialogContent',
          props: [
            { name: 'title', type: 'ReactNode', description: 'Obligatorio. Es el nombre accesible del diálogo.' },
            { name: 'description', type: 'ReactNode', description: 'Contexto bajo el título, leído al abrir.' },
            { name: 'hideClose', type: 'boolean', default: 'false', description: 'Oculta la X de la esquina.' },
          ],
          extends: 'Acepta las props de Radix Dialog.Content (onEscapeKeyDown, onInteractOutside…).',
        },
        { component: 'DialogTrigger / DialogClose', props: [{ name: 'asChild', type: 'boolean', description: 'Usa tu Button como disparador o cierre.' }] },
        { component: 'DialogFooter', props: [{ name: '—', type: '—', description: 'Fila de acciones; en móvil se apilan con la principal arriba.' }] },
      ]}
      a11y={[
        'Al abrir, el foco entra en el diálogo y queda atrapado dentro; al cerrar vuelve al disparador.',
        'Escape y el clic fuera lo cierran.',
        'title y description se anuncian al abrir (aria-labelledby y aria-describedby).',
        'El contenido de fondo queda inerte para el lector de pantalla y el puntero.',
      ]}
      dos={['Úsalo para decisiones que bloquean el flujo o formularios cortos.', 'Botones con verbos concretos: «Retirar», «Publicar tarea».']}
      donts={['No abras un diálogo desde otro diálogo.', 'No lo uses para mensajes informativos: ahí va Alert o un Toast.', 'Para contenido largo usa Sheet (v0.2).']}
    />
  )
}
