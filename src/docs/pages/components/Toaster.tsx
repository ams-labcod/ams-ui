import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./toaster/*.tsx', { eager: true }),
  import.meta.glob('./toaster/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ToasterDoc() {
  return (
    <ComponentDoc
      slug="toaster"
      description="Notificaciones breves que confirman una operación o avisan de un problema sin interrumpir. Aparecen en una esquina, se cierran solas y se pueden llamar desde cualquier parte con toast()."
      importCode={`import { Toaster, toast } from '@ams/ui'

// Una vez, en la raíz de la app:
<Toaster />`}
      examples={examples}
      sections={[
        { name: 'Variants', title: 'Variantes', description: 'El error con acción no se cierra solo: espera a que la persona decida.' },
        { name: 'Progress', title: 'Operación en curso', description: <>Reutiliza el <Code>id</Code> para que «Enviando…» se convierta en «Enviados» en el mismo lugar.</> },
      ]}
      api={[
        {
          component: 'toast(title, options)',
          props: [
            { name: 'description', type: 'ReactNode', description: 'Detalle bajo el título.' },
            { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'También con toast.success(), toast.danger()…' },
            { name: 'duration', type: 'number', default: '5000', description: 'ms antes de cerrarse; Infinity para que espere.' },
            { name: 'action', type: '{ label, onClick }', description: 'Botón dentro de la notificación; al pulsarlo se cierra.' },
            { name: 'id', type: 'string', description: 'Reemplaza una notificación existente con el mismo id.' },
          ],
          extends: 'Devuelve el id. toast.dismiss(id) la cierra; toast.dismiss() cierra todas.',
        },
        {
          component: 'Toaster',
          props: [
            { name: 'position', type: "'bottom-right' | 'bottom-center' | 'top-right'", default: "'bottom-right'", description: 'Esquina de la pantalla.' },
            { name: 'visible', type: 'number', default: '3', description: 'Cuántas se ven a la vez.' },
          ],
        },
      ]}
      a11y={[
        'Las notificaciones se insertan en una región aria-live="polite": se leen sin interrumpir.',
        'Las de error usan role="alert" y se leen al momento.',
        'Pasar el puntero o enfocar una notificación pausa su cierre automático.',
        'El botón de cerrar se llama «Cerrar notificación».',
      ]}
      dos={['Confirma con el mismo verbo de la acción: «Guardar» → «Calificaciones guardadas».', 'Usa duración infinita para errores que requieren una acción.']}
      donts={['No uses toasts para información que la persona necesita consultar después: usa Alert.', 'No muestres un toast por cada fila de una operación masiva: resume.']}
      limitations={['Al pausar y reanudar, el contador vuelve a empezar.']}
    />
  )
}
