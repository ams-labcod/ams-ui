import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./editor/*.tsx', { eager: true }),
  import.meta.glob('./editor/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function EditorDoc() {
  return (
    <ComponentDoc
      slug="editor"
      description="Área de texto con barra de formato que escribe Markdown: títulos, negrita, listas, citas, código y enlaces. Pensado para mensajes y observaciones, no para documentos largos."
      importCode={`import { Editor } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Message', title: 'Mensaje a acudientes', description: 'Selecciona texto y pulsa un botón o usa Ctrl+B, Ctrl+I o Ctrl+K. Volver a aplicar negrita, cursiva o código lo quita.' }]}
      api={[
        {
          component: 'Editor',
          props: [
            { name: 'value, defaultValue', type: 'string', description: 'Texto en Markdown.' },
            { name: 'onChange', type: '(value: string) => void', description: 'Recibe el texto, no el evento.' },
            { name: 'rows', type: 'number', default: '8', description: 'Altura inicial.' },
          ],
          extends: 'Acepta los atributos de <textarea>. Dentro de FormField se conecta como Input.',
        },
        { component: 'applyMarkdown(value, start, end, format)', props: [{ name: 'format', type: "'bold' | 'italic' | 'code' | 'link' | 'heading' | 'list' | 'quote'", description: 'La transformación pura que usa la barra, por si la necesitas en otro control.' }] },
      ]}
      a11y={[
        'La barra es un toolbar: un solo botón en el orden de tabulación y flechas para recorrerla.',
        'Cada botón tiene nombre y anuncia su atajo (aria-keyshortcuts).',
        'Tras formatear, el foco vuelve al texto con la selección sobre lo formateado.',
      ]}
      dos={['Úsalo cuando el formato ayuda a leer: avisos, observaciones largas.']}
      donts={['Para una línea o un dato usa Input o Textarea.']}
      limitations={[
        'Experimental: no muestra vista previa; el texto se guarda como Markdown y lo renderiza quien lo muestra.',
        'Deshacer (Ctrl+Z) no recupera los cambios hechos con la barra en todos los navegadores.',
      ]}
    />
  )
}
