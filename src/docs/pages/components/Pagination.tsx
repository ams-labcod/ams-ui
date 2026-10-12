import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./pagination/*.tsx', { eager: true }),
  import.meta.glob('./pagination/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function PaginationDoc() {
  return (
    <ComponentDoc
      slug="pagination"
      description="Navega entre páginas de una lista larga. Siempre muestra la primera y la última página, la actual y sus vecinas; el resto se resume con «…»."
      importCode={`import { Pagination, paginationRange } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: 'Basic', title: 'Veinte páginas' }]}
      api={[
        {
          component: 'Pagination',
          props: [
            { name: 'page', type: 'number', description: 'Página actual, desde 1.' },
            { name: 'totalPages', type: 'number', description: 'Con 1 o menos no se renderiza.' },
            { name: 'onPageChange', type: '(page: number) => void', description: 'Al elegir página.' },
            { name: 'siblings', type: 'number', default: '1', description: 'Vecinas visibles a cada lado de la actual.' },
          ],
        },
        { component: 'paginationRange(page, total, siblings)', props: [{ name: '→', type: "(number | 'ellipsis')[]", description: 'El cálculo, por si haces tu propia paginación.' }] },
      ]}
      a11y={[
        'Es un <nav> llamado «Paginación».',
        'Cada número se anuncia como «Página N»; la actual lleva aria-current="page".',
        'Anterior y Siguiente se deshabilitan en los extremos; en móvil muestran solo la flecha, pero conservan su nombre.',
      ]}
      dos={['Muestra junto a la paginación cuántos resultados hay («1–10 de 48»).']}
      donts={['No pagines listas de menos de 20 elementos.']}
    />
  )
}
