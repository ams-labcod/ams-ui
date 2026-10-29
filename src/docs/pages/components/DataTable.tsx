import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./data-table/*.tsx', { eager: true }),
  import.meta.glob('./data-table/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function DataTableDoc() {
  return (
    <ComponentDoc
      slug="datatable"
      description="Tabla de datos con orden, selección, paginación, columnas visibles, búsqueda, filtros y acciones por fila y masivas. La lógica (useDataTable, sobre TanStack Table v8) va separada de la vista (DataTable), así sirve igual con datos locales o del servidor."
      importCode={`import { DataTable, useDataTable, type ColumnDef } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        {
          name: 'Students',
          title: 'Listado de estudiantes',
          description: (
            <>
              Busca, añade filtros, ordena por cualquier columna y selecciona filas para ver las acciones masivas. AdvancedFilter filtra los datos antes de pasarlos a la tabla con <Code>applyFilter</Code>.
            </>
          ),
          previewClassName: 'block p-4 sm:p-6',
        },
        { name: 'States', title: 'Carga y sin datos', description: 'loading muestra filas esqueleto; empty sustituye al estado vacío genérico.', previewClassName: 'block p-4 sm:p-6' },
      ]}
      api={[
        {
          component: 'useDataTable(options)',
          props: [
            { name: 'data, columns', type: 'T[], ColumnDef<T>[]', description: 'Filas y definición de columnas de TanStack.' },
            { name: 'getRowId', type: '(row: T) => string', description: 'Id estable; mantiene la selección al ordenar o filtrar.' },
            { name: 'selectable', type: 'boolean', default: 'false', description: 'Añade la columna de casillas.' },
            { name: 'getRowLabel', type: '(row: T) => string', description: 'Nombre de cada fila para la casilla («Seleccionar Ana Pérez»).' },
            { name: 'pageSize', type: 'number', default: '10', description: 'Filas por página.' },
            { name: 'initialSorting', type: 'SortingState', description: 'Orden inicial.' },
            { name: 'globalFilter', type: 'string', description: 'Texto de búsqueda en todas las columnas.' },
            { name: 'tableOptions', type: 'Partial<TableOptions<T>>', description: 'Paso directo a TanStack: paginación o orden en servidor (manualPagination, pageCount…).' },
          ],
        },
        {
          component: 'DataTable',
          props: [
            { name: 'table', type: 'Table<T>', description: 'Resultado de useDataTable o useReactTable.' },
            { name: 'label', type: 'string', description: 'Nombre accesible de la tabla.' },
            { name: 'loading', type: 'boolean', description: 'Filas esqueleto y aria-busy.' },
            { name: 'empty', type: 'ReactNode', description: 'Estado vacío propio.' },
            { name: 'toolbar', type: 'ReactNode', description: 'Búsqueda y filtros a la izquierda.' },
            { name: 'bulkActions', type: '(rows: T[], clear: () => void) => ReactNode', description: 'Acciones sobre la selección.' },
            { name: 'pageSizes', type: 'number[]', default: '[10, 20, 50]', description: 'Opciones de filas por página.' },
          ],
        },
        {
          component: 'columnDef.meta',
          props: [
            { name: 'align', type: "'left' | 'center' | 'right'", description: 'Alineación; números a la derecha.' },
            { name: 'label', type: 'string', description: 'Nombre en el menú «Columnas» si el header no es texto.' },
          ],
        },
      ]}
      a11y={[
        'Es una <table> con nombre; las cabeceras ordenables son botones y la columna lleva aria-sort.',
        'Cada casilla de selección se nombra con su fila; la de la cabecera tiene estado mixto cuando hay selección parcial.',
        'El número de filas seleccionadas se anuncia (aria-live) y las acciones aparecen justo encima de la tabla.',
        'Mientras carga, la tabla está marcada como ocupada y hay un texto oculto «Cargando…».',
        'En pantallas estrechas se desplaza en horizontal dentro de su borde; oculta columnas secundarias desde «Columnas».',
      ]}
      dos={['Da un getRowId estable.', 'Pon las acciones de cada fila en un Dropdown Menu al final.', 'Números alineados a la derecha con meta.align.']}
      donts={['No pongas más de 6–7 columnas visibles por defecto.', 'No pagines en el cliente listas de miles de filas: usa paginación en servidor con tableOptions.']}
      limitations={['Sin filas expandibles ni columnas fijas al desplazar.', 'La búsqueda global solo mira columnas con accessor.']}
    />
  )
}
