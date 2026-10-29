import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./floating-field/*.tsx', { eager: true }),
  import.meta.glob('./floating-field/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function FloatingFieldDoc() {
  return (
    <ComponentDoc
      slug="floating-field"
      description="Campo con la etiqueta dentro: ocupa el sitio del placeholder y sube al enfocar o escribir. Ahorra altura en formularios cortos como el inicio de sesión."
      importCode={`import { FloatingField } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Login', title: 'Inicio de sesión', description: 'Escribe un correo sin @ y pulsa «Ingresar» para ver el error. La etiqueta es un <label> real, no un placeholder.' }]}
      api={[
        {
          component: 'FloatingField',
          props: [
            { name: 'label', type: 'string', description: 'Etiqueta flotante (obligatoria).' },
            { name: 'description', type: 'ReactNode', description: 'Ayuda bajo el campo.' },
            { name: 'error', type: 'ReactNode', description: 'Error: marca el campo como inválido.' },
          ],
          extends: 'Acepta los atributos de <input> salvo placeholder, que usa internamente.',
        },
      ]}
      a11y={[
        'La etiqueta es un <label for> visible en todo momento: nunca desaparece como un placeholder.',
        'Ayuda y error se asocian con aria-describedby; el error añade aria-invalid.',
        'La animación de la etiqueta se desactiva con movimiento reducido.',
      ]}
      dos={['Úsalo en formularios de 2 a 4 campos (inicio de sesión, búsqueda avanzada).']}
      donts={['No lo mezcles con FormField en el mismo formulario: dos estilos de etiqueta confunden.', 'Etiquetas largas se recortan: mantenlas en pocas palabras.']}
      limitations={['Solo para <input>; no hay versión para Textarea ni Select.']}
    />
  )
}
