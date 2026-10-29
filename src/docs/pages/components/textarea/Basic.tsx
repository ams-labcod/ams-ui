import { useState } from 'react'
import { FormField, Textarea } from '@ams-labcod/ams-ui'

const MAX = 280

export default function Basic() {
  const [text, setText] = useState('')
  return (
    <FormField className="w-full max-w-lg" label="Observaciones del período" description={`${text.length} de ${MAX} caracteres`}>
      <Textarea
        value={text}
        maxLength={MAX}
        onChange={(e) => setText(e.target.value)}
        placeholder="Participa activamente en clase y entrega a tiempo sus tareas."
      />
    </FormField>
  )
}
