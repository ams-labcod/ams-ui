import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./table/*.tsx', { eager: true }),
  import.meta.glob('./table/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function TableDoc() {
  return (
    <ComponentDoc
      slug="table"
      description="Tabla semántica con los estilos de AMS para datos que se comparan por filas y columnas. Para ordenar, seleccionar y paginar usa DataTable (v0.3), que se construye sobre esta."
      importCode={`import {
  Table, TableHeader, TableBody, TableFooter, TableRow,
  TableHead, TableCell, TableCaption, TableEmpty,
} from '@ams/ui'`}
      examples={examples}
      sections={[
        { name: 'Grades', title: 'Libreta de notas', description: 'Cifras alineadas a la derecha con tabular-nums, notas bajo 6 en rojo, nombre de la fila como encabezado (scope="row") y pie con el promedio.', previewClassName: 'p-4 sm:p-6' },
        { name: 'Empty', title: 'Sin datos', description: 'TableEmpty ocupa todas las columnas para poner un EmptyState.', previewClassName: 'p-4 sm:p-6' },
      ]}
      api={[
        { component: 'Table', props: [{ name: 'containerClassName', type: 'string', description: 'Clases del contenedor con borde y desplazamiento horizontal.' }], extends: 'Acepta los atributos de <table>.' },
        { component: 'TableHead', props: [{ name: 'scope', type: "'col' | 'row'", default: "'col'", description: 'Usa row para la primera celda de cada fila.' }] },
        { component: 'TableRow', props: [{ name: 'data-state', type: "'selected'", description: 'Marca la fila como seleccionada.' }] },
        { component: 'TableEmpty', props: [{ name: 'colSpan', type: 'number', description: 'Número de columnas de la tabla.' }] },
        { component: 'TableHeader, TableBody, TableFooter, TableCell, TableCaption', props: [{ name: '—', type: '—', description: 'Envoltorios de thead, tbody, tfoot, td y caption.' }] },
      ]}
      a11y={[
        'Es una <table> real: los lectores anuncian fila, columna y encabezados al moverse.',
        'Usa TableCaption o aria-label para decir qué contiene la tabla.',
        'En pantallas estrechas la tabla se desplaza en horizontal dentro de su borde; la página no se desborda.',
      ]}
      dos={['Alinea números a la derecha y texto a la izquierda.', 'Usa Badge para estados, con texto.']}
      donts={['No uses tablas para maquetar.', 'No metas formularios complejos en las celdas: abre un Sheet.']}
    />
  )
}
