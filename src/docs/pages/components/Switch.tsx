import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./switch/*.tsx', { eager: true }),
  import.meta.glob('./switch/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function SwitchDoc() {
  return (
    <ComponentDoc
      slug="switch"
      description="Enciende o apaga un ajuste que se aplica al momento, sin botón de guardar: notificaciones, modo sin conexión, visibilidad de una sección."
      importCode={`import { Switch } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Basic', title: 'Ajustes', description: 'La descripción puede cambiar con el estado para explicar qué implica.' }]}
      api={[
        {
          component: 'Switch',
          props: [
            { name: 'label', type: 'ReactNode', description: 'Texto al lado. Sin él, nómbralo con aria-label.' },
            { name: 'description', type: 'ReactNode', description: 'Ayuda bajo la etiqueta.' },
          ],
          extends: 'Acepta los atributos de <input type="checkbox">: checked, defaultChecked, onChange, name, disabled…',
        },
      ]}
      a11y={[
        'Es un checkbox nativo con role="switch": Espacio lo alterna y se anuncia como «activado» o «desactivado».',
        'El estado no depende solo del color: el círculo cambia de lado.',
      ]}
      dos={['Úsalo cuando el cambio tiene efecto inmediato.', 'La etiqueta nombra el ajuste, no la acción: «Notificaciones push».']}
      donts={['No lo pongas en formularios que se envían con un botón: ahí va un Checkbox.']}
    />
  )
}
