import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./toggle/*.tsx', { eager: true }),
  import.meta.glob('./toggle/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ToggleDoc() {
  return (
    <ComponentDoc
      slug="toggle"
      description="Botón que se queda activado o desactivado: mostrar u ocultar algo, fijar, aplicar un filtro rápido. A diferencia de Switch, vive en barras de herramientas y su texto no cambia."
      importCode={`import { Toggle } from '@ams/ui'`}
      examples={examples}
      sections={[{ name: 'Toolbar', title: 'Filtros rápidos', description: 'Activado lleva el fondo turquesa del ítem activo de la referencia.' }]}
      api={[
        {
          component: 'Toggle',
          props: [
            { name: 'pressed, defaultPressed, onPressedChange', type: 'boolean', description: 'Estado, controlado o no.' },
            { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'outline cuando está suelto, fuera de una barra.' },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de control.' },
          ],
          extends: 'Acepta los atributos de <button>.',
        },
      ]}
      a11y={[
        'Es un botón con aria-pressed: los lectores anuncian «presionado» o «no presionado».',
        'El texto no cambia con el estado; si el botón es solo un icono, ponle aria-label.',
      ]}
      dos={['Etiquetas que describen el estado activado: «Solo en riesgo».']}
      donts={['Para ajustes de configuración con efecto permanente usa Switch.', 'Para elegir una entre varias opciones usa ChipGroup o Tabs.']}
    />
  )
}
