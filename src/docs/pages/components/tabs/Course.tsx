import { CalendarDays, ClipboardCheck, GraduationCap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ams-labcod/ams-ui'

export default function Course() {
  return (
    <Tabs defaultValue="notas" className="w-full max-w-xl">
      <TabsList aria-label="Secciones de 3.º A">
        <TabsTrigger value="notas">
          <GraduationCap />
          Calificaciones
        </TabsTrigger>
        <TabsTrigger value="asistencia">
          <ClipboardCheck />
          Asistencia
        </TabsTrigger>
        <TabsTrigger value="calendario">
          <CalendarDays />
          Calendario
        </TabsTrigger>
        <TabsTrigger value="pagos" disabled>
          Pagos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="notas" className="text-sm text-fg-muted">
        Promedio del curso: <strong className="text-fg">8,2</strong>. Faltan 6 notas por registrar.
      </TabsContent>
      <TabsContent value="asistencia" className="text-sm text-fg-muted">
        Asistencia del mes: <strong className="text-fg">94,6 %</strong>. 14 ausencias, 6 justificadas.
      </TabsContent>
      <TabsContent value="calendario" className="text-sm text-fg-muted">
        Próximo examen: Matemáticas, jueves 12.
      </TabsContent>
    </Tabs>
  )
}
