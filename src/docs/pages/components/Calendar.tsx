import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./calendar/*.tsx', { eager: true }),
  import.meta.glob('./calendar/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function CalendarDoc() {
  return (
    <ComponentDoc
      slug="calendar"
      description="Mes en cuadrícula para elegir un día o un rango. Reproduce el calendario de la referencia: celdas hundidas, días con eventos en turquesa con un punto y la semana empezando en lunes. El mes y el año se eligen directamente en la cabecera."
      importCode={`import { Calendar } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Events', title: 'Con eventos y días bloqueados', description: 'Los puntos marcan exámenes y entregas; los domingos no se pueden elegir. Usa las flechas para moverte, Re Pág / Av Pág para cambiar de mes, o los selectores de mes y año para saltar.' },
        { name: 'Range', title: 'Rango de fechas', description: 'mode="range": el primer clic fija el inicio y el segundo el final. Mientras falta el final, el rango se previsualiza al pasar el puntero o mover el foco. Si eliges una fecha anterior al inicio, se intercambian.' },
      ]}
      api={[
        {
          component: 'Calendar',
          props: [
            { name: 'mode', type: "'single' | 'range'", default: "'single'", description: 'Un día o un rango.' },
            { name: 'value, defaultValue', type: 'Date | null  ·  DateRange', description: 'Día elegido, o { from, to } en modo rango.' },
            { name: 'onChange', type: '(date: Date) => void  ·  (range: DateRange) => void', description: 'En rango se llama con cada clic; está completo cuando to no es null.' },
            { name: 'yearRange', type: '[number, number]', description: 'Años del selector. Por defecto los de min/max o 10 años alrededor del actual.' },
            { name: 'defaultMonth', type: 'Date', description: 'Mes inicial; por defecto el del valor o el actual.' },
            { name: 'min, max', type: 'Date', description: 'Límites; los días fuera no se pueden elegir y la navegación se detiene en ellos.' },
            { name: 'isDisabled', type: '(date: Date) => boolean', description: 'Bloquea días concretos (festivos, domingos).' },
            { name: 'events', type: 'Date[]', description: 'Días con eventos: se marcan con un punto.' },
            { name: 'locale', type: 'string', default: "'es'", description: 'Idioma de meses y días.' },
            { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Enfoca el día elegido al montar.' },
          ],
        },
      ]}
      a11y={[
        'Cabecera con selectores de mes y año (comboboxes con nombre) además de las flechas; los meses fuera de min/max aparecen deshabilitados.',
        'En modo rango, los días de inicio y fin se anuncian como tales y todos los del rango llevan aria-selected; un texto bajo el calendario indica el siguiente paso (aria-live).',
        'Patrón de cuadrícula: un solo día en el orden de tabulación; flechas para días y semanas, Inicio/Fin para el principio y el final de la semana, Re Pág/Av Pág para meses (con Mayús, años).',
        'Cada día se anuncia con la fecha completa («jueves, 15 de octubre de 2026»), si tiene eventos y si es hoy (aria-current="date").',
        'El nombre del mes se anuncia al cambiar (aria-live).',
        'Los días bloqueados se anuncian como no disponibles pero siguen siendo alcanzables con el teclado.',
      ]}
      dos={['Úsalo cuando ver el mes ayuda a decidir (eventos, disponibilidad).']}
      donts={['Para fechas lejanas (nacimiento) es más rápido escribirlas: considera <Input type="date">.']}
      limitations={['Un solo rango por calendario y un solo mes visible.', 'La semana siempre empieza en lunes.']}
    />
  )
}
