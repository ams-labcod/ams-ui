import { ArrowRight, Download, Play } from 'lucide-react'
import { Button } from '@ams-labcod/ams-ui'

export default function WithIcons() {
  return (
    <>
      {/* asChild: un enlace con aspecto de botón, como "Ingresar al sistema". */}
      <Button asChild size="lg">
        <a href="#/button">
          Ingresar al sistema
          <ArrowRight className="transition-transform group-hover/button:translate-x-0.75" />
        </a>
      </Button>
      <Button variant="secondary" size="lg">
        <Play />
        Ver demo guiada
      </Button>
      <Button variant="outline">
        <Download />
        Descargar PDF
      </Button>
    </>
  )
}
