import { loadExamples, PatternDoc } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./examples/*.tsx', { eager: true }),
  import.meta.glob('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)
const ex = (name: string) => examples.get(name)!

const use = (...pairs: [string, string][]) => pairs.map(([slug, title]) => ({ slug, title }))

export const DashboardPage = () => (
  <PatternDoc
    slug="dashboard"
    description="Panel de inicio de una rectora: cifras clave con su variación, matrículas por mes, actividad reciente, evolución del promedio y el avance del cierre de período."
    example={ex('Dashboard')}
    uses={use(['stat', 'Stat'], ['progress', 'Progress'], ['charts', 'Charts'], ['scroll-area', 'Scroll Area'], ['chips', 'Chips'], ['toaster', 'Toaster'], ['grid', 'Grid'], ['stack', 'Stack'], ['inline', 'Inline'])}
    notes={[
      'Una cifra por tarjeta, con la variación y su periodo de comparación. El color de la variación depende de si subir es bueno: más inasistencias va en rojo aunque suba.',
      'Grid pasa de 4 columnas a 2 y a 1 según el ancho; los gráficos ocupan dos tercios en escritorio y el ancho completo en móvil.',
      'Las tarjetas son de vidrio sobre la aurora; el contenido de los gráficos usa superficie sólida en tooltips para leerse bien.',
    ]}
  />
)

export const UsersPage = () => (
  <PatternDoc
    slug="gestion-de-usuarios"
    description="Gestión de usuarios completa: búsqueda, tabla con paginación y selección, alta y edición en un panel lateral con validación, cambio de acceso al instante y eliminación con confirmación."
    example={ex('Users')}
    uses={use(
      ['datatable', 'DataTable'],
      ['sheet', 'Sheet'],
      ['form', 'Form'],
      ['select', 'Select'],
      ['switch', 'Switch'],
      ['alert-dialog', 'Alert Dialog'],
      ['dropdown-menu', 'Dropdown Menu'],
      ['toaster', 'Toaster'],
      ['avatar', 'Avatar'],
      ['badge', 'Badge'],
    )}
    notes={[
      'Crear y editar comparten el mismo formulario en un Sheet: la lista sigue visible detrás y el contexto no se pierde.',
      'El acceso se cambia con un Switch porque tiene efecto inmediato; se confirma con un toast, sin diálogo.',
      'Eliminar sí pide confirmación con Alert Dialog: no se puede deshacer y la descripción dice qué pasa con los registros.',
      'El correo se muestra bajo el nombre; su columna propia está oculta por defecto y se puede activar en «Columnas».',
    ]}
  />
)

export const CourseListPage = () => (
  <PatternDoc
    slug="listado-con-filtros"
    description="Listado de cursos en tarjetas con búsqueda (con espera para no filtrar en cada tecla), filtro por área, orden y estados de carga y sin resultados."
    example={ex('CourseList')}
    uses={use(['input', 'Input'], ['chips', 'Chips'], ['select', 'Select'], ['skeleton', 'Skeleton'], ['empty-state', 'Empty State'], ['progress', 'Progress'], ['usedebouncedvalue', 'useDebouncedValue'], ['grid', 'Grid'])}
    notes={[
      'El número de resultados se anuncia con aria-live cada vez que cambia el filtro.',
      'Sin resultados, el estado vacío ofrece la acción que lo resuelve: limpiar búsqueda y filtros.',
      'Toda la tarjeta es clicable a través del enlace del título, así el lector de pantalla anuncia un solo enlace por curso.',
      'Grid con minItemWidth reparte las tarjetas según el ancho disponible sin puntos de corte fijos.',
    ]}
  />
)

export const LoadStatesPage = () => (
  <PatternDoc
    slug="estados-de-carga"
    description="Los tres estados que toda vista con datos remotos debe resolver: cargando, error y sin datos. Cambia el resultado simulado y pulsa «Recargar»."
    example={ex('LoadStates')}
    uses={use(['skeleton', 'Skeleton'], ['alert', 'Alert'], ['empty-state', 'Empty State'], ['table', 'Table'], ['button', 'Button'], ['toaster', 'Toaster'])}
    notes={[
      'Cargando: esqueletos con la forma del contenido y la sección marcada con aria-busy.',
      'Error: dice qué pasó, tranquiliza sobre los datos y ofrece reintentar. No pide disculpas ni es vago.',
      'Vacío: no es un error; explica qué aparecerá ahí.',
      'El botón Recargar muestra su propio estado de carga para que se vea que la acción hizo algo.',
    ]}
  />
)
