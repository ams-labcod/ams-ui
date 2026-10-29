import { useState } from 'react'
import { Editor, FormField } from '@ams-labcod/ams-ui'

export default function Message() {
  const [text, setText] = useState('## Reunión de acudientes\n\nLes recordamos la reunión del **jueves 12** a las 6:30 p. m.\n\n- Entrega de boletines\n- Salida pedagógica')
  return (
    <FormField className="w-full max-w-xl" label="Mensaje para acudientes de 3.º A" description={`${text.length} caracteres. Admite Markdown.`}>
      <Editor value={text} onChange={setText} />
    </FormField>
  )
}
