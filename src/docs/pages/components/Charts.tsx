import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./charts/*.tsx', { eager: true }),
  import.meta.glob('./charts/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function ChartsDoc() {
  return (
    <ComponentDoc
      slug="charts"
      description="Gráficos de línea, área, barras y donut sobre recharts, con la paleta de AMS validada para daltonismo en ambos temas. Todos traen tooltip, leyenda, estados de carga y vacío, y una vista de tabla con los mismos datos."
      importCode={`import { LineChart, AreaChart, BarChart, DonutChart } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Bars', title: 'Barras', description: 'Comparar cantidades entre categorías. Las barras de la referencia, con extremo redondeado y como máximo 24 px de grosor.', previewClassName: 'block' },
        { name: 'Lines', title: 'Líneas', description: 'Cambio en el tiempo de varias series. Pasa el puntero para ver todos los valores de un período.', previewClassName: 'block' },
        { name: 'Area', title: 'Área', description: 'Una serie en el tiempo cuando el volumen importa. Relleno al 12 %, nunca un bloque sólido.', previewClassName: 'block' },
        { name: 'Donut', title: 'Donut', description: 'Partes de un todo, con el total en el centro y porcentajes como etiquetas directas. Hasta 5 partes.', previewClassName: 'block' },
      ]}
      api={[
        {
          component: 'LineChart / AreaChart / BarChart',
          props: [
            { name: 'data', type: 'T[]', description: 'Filas: una por punto del eje X.' },
            { name: 'index', type: 'keyof T', description: 'Clave del eje X.' },
            { name: 'series', type: '{ key, label }[]', description: 'Hasta 5; el color sigue el orden (chart-1…chart-5).' },
            { name: 'title, description', type: 'string, ReactNode', description: 'Título visible (nombre del gráfico) y subtítulo.' },
            { name: 'valueFormatter', type: '(n: number) => string', description: 'Formato en tooltip y tabla.' },
            { name: 'stacked', type: 'boolean', description: 'Solo Area y Bar: apila las series.' },
            { name: 'height', type: 'number', default: '280', description: 'Altura del área de dibujo.' },
            { name: 'loading, empty', type: 'boolean, ReactNode', description: 'Estados de carga y sin datos.' },
          ],
        },
        {
          component: 'DonutChart',
          props: [
            { name: 'data', type: '{ label, value }[]', description: 'Partes del todo.' },
            { name: 'centerLabel', type: 'string', default: "'Total'", description: 'Texto bajo el total.' },
            { name: 'centerFormatter', type: '(n: number) => string', default: 'valueFormatter', description: 'Formato del total; compacto si las cifras son largas.' },
            { name: 'title, description, valueFormatter, height, loading, empty', type: '—', description: 'Igual que los cartesianos.' },
          ],
        },
      ]}
      a11y={[
        'Cada gráfico es un <figure> nombrado por su título; el SVG está oculto para lectores y «Ver tabla» ofrece los mismos datos como tabla real.',
        'La identidad nunca depende solo del color: con dos o más series hay leyenda, y el donut lleva etiquetas directas.',
        'Paleta validada (CVD ΔE ≥ 12, contraste ≥ 3:1 con la superficie) por separado para tema oscuro y claro.',
        'Los textos (ejes, valores, leyenda) van en colores de texto, nunca en el color de la serie.',
      ]}
      dos={['Un solo eje Y: si dos medidas tienen escalas distintas, haz dos gráficos.', 'Ordena las series de forma estable: el color sigue a la serie, no a su posición tras filtrar.']}
      donts={['Más de 5 series: agrupa en «Otros» o usa varios gráficos pequeños.', 'No uses donut para comparar valores parecidos: las barras se leen mejor.']}
      limitations={['Sin zoom ni selección de rango en el eje X.', 'La textura alternativa al color para impresión en blanco y negro no está implementada.']}
    />
  )
}
