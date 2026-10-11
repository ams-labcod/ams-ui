import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./input/*.tsx', { eager: true }),
  import.meta.glob('./input/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function InputDoc() {
  return (
    <ComponentDoc
      slug="input"
      description="Campo de texto de una línea. Se hunde en la superficie (sunken) y se ilumina en turquesa al enfocarlo. Úsalo dentro de FormField para que la etiqueta, la ayuda y el error se conecten solos."
      importCode={`import { FormField, Input } from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Uso básico', description: <>startIcon añade un icono decorativo a la izquierda, útil en búsquedas. Para buscar usa <Code>type="search"</Code>.</> },
        { name: 'States', title: 'Estados', description: 'Error, deshabilitado y solo lectura. El error lo pone FormField: el borde y el foco pasan a rojo y el mensaje se asocia al campo.' },
      ]}
      api={[
        {
          component: 'Input',
          props: [{ name: 'startIcon', type: 'ReactNode', description: 'Icono decorativo a la izquierda.' }],
          extends: 'Acepta todos los atributos de <input>. Dentro de FormField hereda id, required, disabled, aria-invalid y aria-describedby.',
        },
      ]}
      a11y={[
        'Siempre con etiqueta visible: FormField o un <Label htmlFor>. El placeholder no sustituye a la etiqueta.',
        'Con error, recibe aria-invalid y el mensaje se lee junto al campo (aria-describedby).',
        'Usa type y autoComplete adecuados (email, tel, name): el teclado móvil y el autocompletado mejoran.',
      ]}
      dos={['Etiquetas cortas y concretas: «Correo del acudiente».', 'Errores que dicen cómo corregir: «Escribe un correo con @».']}
      donts={['No uses el placeholder como etiqueta: desaparece al escribir.', 'No valides mientras la persona todavía escribe; hazlo al salir del campo o al enviar.']}
    />
  )
}
