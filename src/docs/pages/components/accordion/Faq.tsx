import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ams/ui'

// Las preguntas frecuentes de la referencia.
const faq = [
  ['¿Cuánto tarda la implementación?', 'El onboarding estándar toma entre 2 y 4 semanas, dependiendo del tamaño de la institución y el volumen de datos a migrar.'],
  ['¿Pueden migrar nuestros datos actuales?', 'Sí. Importamos desde Excel, Google Sheets y la mayoría de sistemas académicos. Validamos cada registro antes de pasar a producción.'],
  ['¿Funciona sin conexión a internet?', 'La app móvil tiene modo offline para captura de calificaciones y asistencia. Los datos se sincronizan al recuperar conexión.'],
  ['¿Puedo personalizar las escalas de calificación?', 'Sí. Escalas numéricas, alfabéticas o por niveles de desempeño, con ponderaciones por período o materia.'],
]

export default function Faq() {
  return (
    <Accordion type="single" collapsible defaultValue="0" className="w-full max-w-2xl">
      {faq.map(([q, a], i) => (
        <AccordionItem key={q} value={String(i)}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent>{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
