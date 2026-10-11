import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./alert/*.tsx', { eager: true }),
  import.meta.glob('./alert/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function AlertDoc() {
  return (
    <ComponentDoc
      slug="alert"
      description="Mensaje que acompaña a una vista para informar de algo que afecta a lo que la persona está haciendo. Se queda en la página; para avisos temporales usa Toaster (v0.2)."
      importCode={`import { Alert } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Variants', title: 'Variantes', description: 'Cada variante tiene su icono además del color, para que el tono se entienda sin depender de él.' },
        { name: 'Actions', title: 'Con acciones y cierre', description: 'action añade botones bajo el mensaje; onDismiss muestra la X. Cierra el aviso para ver cómo vuelve.' },
      ]}
      api={[
        {
          component: 'Alert',
          props: [
            { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Tono, icono y rol accesible.' },
            { name: 'title', type: 'ReactNode', description: 'Resumen en una línea.' },
            { name: 'children', type: 'ReactNode', description: 'Detalle: qué pasó y qué hacer.' },
            { name: 'action', type: 'ReactNode', description: 'Botones o enlaces bajo el mensaje.' },
            { name: 'onDismiss', type: '() => void', description: 'Si se pasa, aparece el botón de cerrar.' },
          ],
          extends: 'Acepta los atributos de <div>.',
        },
      ]}
      a11y={[
        'warning y danger usan role="alert": el lector de pantalla los lee en cuanto aparecen.',
        'info y success usan role="status": se anuncian sin interrumpir.',
        'El botón de cerrar se llama «Cerrar aviso».',
        'Si el aviso está en la página desde el principio, no hace falta anunciarlo: renderízalo solo cuando ocurra el evento.',
      ]}
      dos={['Di qué pasó y cómo resolverlo: «La fila 14 no tiene documento. Corrígela y vuelve a subir».', 'Colócalo cerca de lo que afecta.']}
      donts={['No pidas disculpas ni seas vago («Algo salió mal»).', 'No apiles varios avisos: agrúpalos en uno.']}
    />
  )
}
