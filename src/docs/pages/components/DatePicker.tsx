import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./date-picker/*.tsx', { eager: true }),
  import.meta.glob('./date-picker/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function DatePickerDoc() {
  return (
    <ComponentDoc
      slug="date-picker"
      description="Campo de fecha que abre el calendario en un popover. Muestra la fecha escrita en palabras para que no haya dudas entre día y mes."
      importCode={`import { DatePicker, DateRangePicker } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Basic', title: 'Con límites y validación', description: 'El primer campo limita a los próximos dos meses y salta fines de semana; el segundo muestra el estado de error dentro de un FormField.' },
        { name: 'Range', title: 'Rango y fechas lejanas', description: 'DateRangePicker elige desde y hasta en un solo calendario. Para fechas de hace años, yearRange y el selector de año de la cabecera.' },
      ]}
      api={[
        {
          component: 'DatePicker',
          props: [
            { name: 'value, defaultValue', type: 'Date | null', description: 'Fecha elegida, controlada o no.' },
            { name: 'onChange', type: '(date: Date | null) => void', description: 'null al pulsar «Borrar».' },
            { name: 'placeholder', type: 'string', default: "'Elige una fecha'", description: 'Texto sin fecha.' },
            { name: 'format', type: 'Intl.DateTimeFormatOptions', default: '{ day, month: "long", year }', description: 'Cómo se escribe la fecha en el campo.' },
            { name: 'name', type: 'string', description: 'Envía AAAA-MM-DD en un <form> nativo.' },
            { name: 'min, max, isDisabled, events, locale, yearRange', type: '—', description: 'Se pasan al Calendar.' },
          ],
          extends: 'Dentro de FormField hereda id, required, disabled y el estado de error.',
        },
        {
          component: 'DateRangePicker',
          props: [
            { name: 'value, defaultValue', type: 'DateRange', description: '{ from: Date | null, to: Date | null }' },
            { name: 'onChange', type: '(range: DateRange) => void', description: 'Con cada clic; se cierra al completar el rango.' },
            { name: 'placeholder', type: 'string', default: "'Elige un rango de fechas'", description: 'Texto sin rango.' },
            { name: 'name', type: 'string', description: 'Envía <name>_desde y <name>_hasta (AAAA-MM-DD).' },
          ],
          extends: 'Resto de props igual que DatePicker.',
        },
      ]}
      a11y={[
        'El disparador es un botón con el nombre de la etiqueta y la fecha actual como contenido.',
        'Al abrir, el foco va al día elegido (o a hoy); Escape cierra y devuelve el foco al campo.',
        'Hoy y Borrar son botones normales dentro del popover.',
      ]}
      dos={['Úsalo para fechas cercanas: entregas, reuniones, inscripciones.']}
      donts={['Para fechas muy lejanas escribirla puede ser más rápido: considera <Input type="date">.']}
      limitations={['No se puede escribir la fecha con el teclado; solo elegirla en el calendario.']}
    />
  )
}
