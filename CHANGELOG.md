# Changelog

Hitos internos de desarrollo, no versiones publicadas.

## Calendario: rango y año

- Calendar admite `mode="range"`: el primer clic fija el inicio y el segundo el final; si el segundo es anterior, se intercambian; un tercer clic empieza un rango nuevo. Mientras falta el final, el rango se previsualiza al pasar el puntero o mover el foco con el teclado. Un texto bajo el calendario indica el siguiente paso.
- Cabecera con selectores de mes y año además de las flechas. `yearRange` define los años; por defecto salen de min/max (o 10 años alrededor del actual). Los meses fuera de min/max aparecen deshabilitados.
- Nuevo `DateRangePicker`: rango en un campo; se cierra al completar el rango y envía `<name>_desde` y `<name>_hasta` en formularios nativos.
- `DatePicker` acepta `yearRange`.
- AdvancedFilter usa DateRangePicker para el operador «entre» de fechas.
- Funciones nuevas exportadas: `nextRange` y el tipo `DateRange`.
- 5 pruebas nuevas: lógica del rango, selección con clics, salto de año y mes, meses deshabilitados y DateRangePicker de principio a fin.

## Fase G: calidad y publicación

### Accesibilidad
- Auditoría automatizada (`npm run a11y`): axe-core con WCAG 2.0–2.2 A/AA sobre las 70 páginas de la documentación, en los dos temas, con Chrome real (también mide el contraste). Resultado: 0 infracciones.
- Corregido a raíz de la auditoría:
  - Slider dejaba en blanco la página si `formatValue` usaba parámetros opcionales (`map` le pasaba también el índice y el array). Incluye prueba de regresión.
  - Tema claro: semánticos y acento un paso más oscuros (info #1A55AD, success #126B3A, warning #7A5000, danger #A92626, accent #1A7068) para superar 4,5:1 también sobre sus fondos suaves.
  - DatePicker ya no pone `aria-required` en su botón disparador.
  - El botón «Ver como tabla» de los gráficos tiene un nombre fijo; su estado lo indica `aria-pressed`.
  - Las descripciones de RadioGroup en tarjetas usan `fg-muted`, porque van sobre vidrio.
  - El logo se anuncia como «AMS UI» (antes, «AMSUI»).
  - Documentación: los bloques de código con desplazamiento se pueden enfocar; el marco de los ejemplos dejó de ser vidrio (vidrio sobre vidrio bajaba el contraste); hay error boundary por página.

### Paquete
- `npm run build:lib` genera `dist-lib/`: ESM, sourcemaps, tipos `.d.ts` y `tokens.css`. Dependencias y peers quedan fuera del bundle (130 kB de código propio).
- `package.json`: `exports` (`@ams/ui` y `@ams/ui/tokens.css`), `files`, y `peerDependencies` (React 19, Tailwind CSS 4).
- `npm run smoke`: importa el paquete compilado y renderiza componentes en Node.
- Probado además un consumidor TypeScript estricto contra los tipos publicados (`skipLibCheck: false`).
- `npm run check:release` encadena check, build del paquete, smoke y auditoría.
- README con instalación, uso, comandos y convenciones.

## v0.3.1 — completada

### Fase F: layout, patrones y hooks
- Layout: Flex (base), Stack, Inline, Container, Grid (columnas por punto de corte o automáticas con `minItemWidth`), Divider con etiqueta y AspectRatio (CSS nativo). Spacer descartado: `gap` lo cubre.
- Stat: cifra clave con variación coloreada según si subir es bueno.
- Hooks: useDisclosure, useMediaQuery, useDebouncedValue, useInView, useHotkey (`matchesHotkey`). La documentación usa useHotkey para Ctrl K y «/».
- Patrones completos, solo con componentes de la librería: Dashboard, Gestión de usuarios (alta, edición, acceso, eliminación con confirmación), Listado con filtros y Carga, error y vacío.
- Documentación: páginas de hooks y utilidades (formato, `cn`, fechas). Ya no queda ningún componente planificado sin página.
- `useDataTable`: nueva opción `initialColumnVisibility`.
- `ProgressRing`: nueva prop `showValue`.
- 81 pruebas (6 nuevas).

### Correcciones
- DataTable: el selector de filas por página quedaba vacío si `pageSize` no estaba entre las opciones.
- ProgressRing junto a una cifra mostraba otro redondeo (95 % frente a 94,6 %); ahora puede ir sin número.

## v0.3 — completada

### Fase E: componentes avanzados y datos
- Componentes: Progress y ProgressRing (el anillo de asistencia de la referencia), Slider (valor o rango), Toggle, AlertDialog, HoverCard, ContextMenu, Combobox (local o búsqueda en servidor), Accordion (las FAQ de la referencia), Breadcrumb (con colapso) y Pagination (`paginationRange`).
- DropdownMenuCheckboxItem: ítem con casilla que no cierra el menú.
- DataTable: `useDataTable` (lógica, sobre TanStack Table v8) separado de `<DataTable>` (vista). Orden con aria-sort, selección con acciones masivas, paginación, columnas visibles, búsqueda global, estados de carga y vacío. `tableOptions` permite paginación en servidor.
- AdvancedFilter: condiciones por tipo (texto, selección, número, fecha) combinadas con «todas» o «alguna», chips legibles y funciones puras (`applyFilter`, `describeCondition`).
- Charts sobre recharts: LineChart, AreaChart, BarChart y DonutChart, con tooltip, leyenda, estados y vista de tabla accesible en todos.
- Paleta de gráficos `chart-1…chart-5`, validada con simulación de daltonismo, banda de luminosidad y contraste, por separado para cada tema.
- 75 pruebas (19 nuevas).

### Estados
- Beta: Combobox (sin selección múltiple), DataTable, AdvancedFilter y Charts.

### Decisiones
- @tanstack/react-table fijado en v8: la v9 recién publicada cambia la API.
- La primera ordenación siempre es ascendente; TanStack invierte el orden en columnas numéricas y resultaba incoherente.
- Las líneas ajustan el eje Y a los datos; barras y áreas parten de cero.
- Los colores que se pasan desde JavaScript (gráficos) usan variables `--ams-*`: las `--color-*` de `@theme inline` no existen en tiempo de ejecución.

## v0.2 — completada

### Fase D: formularios avanzados, overlays y datos
- Componentes: FloatingField, RadioGroup (lista y tarjetas), Chip y ChipGroup, Form y FormItem (react-hook-form + zod), Calendar, DatePicker, Sheet (4 lados), Command y CommandDialog (cmdk), Dropzone y DropzoneFile, Editor, Table, Collapsible, ScrollArea y Toaster con `toast()`.
- Utilidades públicas: `validateFiles`, `applyMarkdown`, `formatBytes`, `formatNumber`, `formatCurrency`, `formatDate` y `dates` (cálculo de calendario).
- FieldDescription y FieldError extraídos de FormField para reutilizarlos.
- Animaciones nuevas en tokens: entrada de Sheet, despliegue de Collapsible y entrada de toast.
- Documentación: buscador convertido en paleta de comandos (Ctrl K) con Command; Toaster montado en la app.
- `package.json` declara `sideEffects: ["*.css"]`: el chunk principal de la documentación bajó de 515 a 259 kB.
- 56 pruebas (29 nuevas): teclado de Calendar y RadioGroup, Form con esquema y foco en el primer error, filtrado de Command, Dropzone, atajos y toolbar del Editor, ciclo de vida de los toasts.

### Estados
- Beta: Form, Calendar y DatePicker (sin rango ni escritura de fechas), Dropzone (no sube: entrega los archivos).
- Experimental: Editor (sin vista previa).

### Decisiones
- En Calendar, el día elegido va relleno con el degradado primario y hoy lleva borde turquesa. En la referencia hoy iba relleno, pero en un selector lo elegido tiene que destacar más.
- Toaster propio (unas 100 líneas) en lugar de una dependencia: región aria-live estable, reemplazo por id y pausa al pasar el puntero.

## v0.1 — completada

### Fase B: fundamentos
- Proyecto: React 19, Vite 8, TypeScript estricto, Tailwind CSS v4, Vitest y oxlint.
- Tokens en `src/styles/tokens.css`, extraídos de «AMS - Sistema de Gestión Académica.html»: color, tipografía, radios, sombras, alturas de control, puntos de corte, movimiento, capas, foco y estado deshabilitado.
- Tema oscuro (el original) y claro (derivado), cambiados con `data-theme`. Se puede fijar por contenedor.
- `useTheme` y `applyTheme` para cambiar de tema, con persistencia en `localStorage`.
- Marca: `Logo` (logo extraído del bundle standalone) y `Aurora` (fondo ambiental).
- Documentación: buscador (Ctrl K), catálogo completo con estados y páginas de Marca, Color, Tipografía y Tokens.

### Fase C: componentes esenciales
- Componentes: Button, Badge, Alert, Label, FormField, Input, Textarea, Select, Checkbox, Switch, Dialog, Popover, Tooltip, DropdownMenu, Tabs, Avatar, Separator, Skeleton, Spinner y EmptyState.
- FormField conecta solo con cualquier control: id, required, disabled, aria-invalid y aria-describedby (`useFieldControl` para controles propios).
- Overlays, Select y Tabs sobre Radix (`radix-ui`), con los estilos de AMS. Checkbox y Switch son inputs nativos.
- Token nuevo: `on-danger` (texto sobre el botón destructive).
- Documentación: una página por componente con ejemplos reales (se muestra el código fuente exacto de cada ejemplo), propiedades, accesibilidad, uso y limitaciones; playground con controles en Button. El armazón de la documentación ya usa Button, Badge, Input y Tooltip.
- 27 pruebas de comportamiento: teclado en Tabs, Dropdown y Select; foco y Escape en Dialog; conexión de FormField; estados de Button.

### Estados
- Beta: Select (sin grupos ni selección múltiple) y DropdownMenu (sin ítems de casilla ni submenús). El resto, estable.

### Decisiones
- `fg-subtle` pasa de #7D8B9D a #8594A6: el original daba 4,4:1 sobre vidrio (WCAG AA pide 4,5:1).
- `danger` y `success` no existían en la referencia. Se derivaron con la misma estructura que info y warning (texto, fondo suave y borde).
- La paleta de Tailwind por defecto está desactivada: solo existen los colores de AMS.
- Input, Textarea y Select usan radio de 12 px (rounded-md); botones, búsqueda y pestañas son píldoras. La referencia no tiene campos de formulario: una píldora de varias líneas no funciona en Textarea.
- Diálogos, menús y popovers usan superficie sólida (surface) y no vidrio, para que el texto se lea sobre cualquier fondo.
