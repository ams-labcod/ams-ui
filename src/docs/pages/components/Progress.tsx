import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./progress/*.tsx', { eager: true }),
  import.meta.glob('./progress/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ProgressDoc() {
  return (
    <ComponentDoc
      slug="progress"
      description="Muestra cuánto de algo se ha completado: una operación en curso o una proporción (notas registradas, cupos ocupados). Incluye el anillo de asistencia de la referencia."
      importCode={`import { Progress, ProgressRing } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Bars', title: 'Barras', description: 'Con value={null} es indeterminado: algo ocurre pero no se sabe cuánto falta. El tono cambia el significado: success para completado, warning cerca del límite.' },
        { name: 'Ring', title: 'Anillo', description: 'Para una cifra destacada dentro de una tarjeta.' },
      ]}
      api={[
        {
          component: 'Progress',
          props: [
            { name: 'value', type: 'number | null', description: 'Valor actual; null para indeterminado.' },
            { name: 'max', type: 'number', default: '100', description: 'Valor que equivale a completo.' },
            { name: 'label', type: 'string', description: 'Etiqueta visible y nombre accesible.' },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Muestra el porcentaje.' },
            { name: 'tone', type: "'accent' | 'success' | 'warning' | 'danger'", default: "'accent'", description: 'Color según el significado.' },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Grosor de la barra.' },
          ],
        },
        {
          component: 'ProgressRing',
          props: [
            { name: 'value, max, label, tone', type: '—', description: 'Igual que Progress.' },
            { name: 'size', type: 'number', default: '90', description: 'Diámetro en px.' },
            { name: 'children', type: 'ReactNode', description: 'Contenido del centro; por defecto el porcentaje.' },
            { name: 'showValue', type: 'boolean', default: 'true', description: 'false deja el centro vacío cuando la cifra ya está al lado.' },
          ],
        },
      ]}
      a11y={[
        'Es un progressbar con nombre, valor mínimo, máximo y actual; el porcentaje se anuncia como texto (aria-valuetext).',
        'Indeterminado no tiene valor: los lectores anuncian que está ocupado.',
        'Con movimiento reducido, la barra indeterminada deja de desplazarse.',
      ]}
      dos={['Etiquetas que dicen qué avanza: «Boletines enviados: 120 de 312».', 'Usa el tono warning solo cuando de verdad hay que prestar atención.']}
      donts={['No uses una barra para algo que dura menos de un segundo: basta un spinner.', 'No la uses como gráfico de comparación entre varias categorías: usa BarChart.']}
    />
  )
}
