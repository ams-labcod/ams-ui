import { FileDown, Mail, Printer } from 'lucide-react'
import { Button, Tooltip } from '@juanarenas312002/ams-ui'

export default function IconButtons() {
  return (
    <>
      <Tooltip content="Exportar a PDF">
        <Button variant="secondary" size="icon" aria-label="Exportar a PDF">
          <FileDown />
        </Button>
      </Tooltip>
      <Tooltip content="Imprimir boletines">
        <Button variant="secondary" size="icon" aria-label="Imprimir boletines">
          <Printer />
        </Button>
      </Tooltip>
      <Tooltip content="Enviar a los acudientes" side="bottom">
        <Button variant="secondary" size="icon" aria-label="Enviar a los acudientes">
          <Mail />
        </Button>
      </Tooltip>
    </>
  )
}
