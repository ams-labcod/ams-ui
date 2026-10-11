import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type Status = 'stable' | 'beta' | 'experimental' | 'planned'
export type Version = 'v0.1' | 'v0.2' | 'v0.3' | 'v0.3.1'

export interface DocEntry {
  slug: string
  title: string
  category: string
  status: Status
  since: Version
  /** Sin página: se muestra la ficha de "planificado". */
  page?: LazyExoticComponent<ComponentType>
}

const page = (load: () => Promise<{ default: ComponentType }>) => lazy(load)

// Página de componente: el archivo vive en pages/components/<Nombre>.tsx.
const component = (slug: string, title: string, category: string, status: Status, file: string, since: Version = 'v0.1'): DocEntry => ({
  slug,
  title,
  category,
  status,
  since,
  page: lazy(() => import(`./pages/components/${file}.tsx`)),
})

// Páginas exportadas con nombre desde un archivo compartido (layout, hooks, patrones).
type Pages = Record<string, ComponentType>
const named = (load: () => Promise<Pages>, key: string, slug: string, title: string, category: string, status: Status = 'stable'): DocEntry => ({
  slug,
  title,
  category,
  status,
  since: 'v0.3.1',
  page: lazy(() => load().then((m) => ({ default: m[key]! }))),
})
const layout = () => import('./pages/layout/LayoutPages') as Promise<Pages>
const hooks = () => import('./pages/hooks/HookPages') as Promise<Pages>
const patterns = () => import('./pages/patterns/PatternPages') as Promise<Pages>

export const registry: DocEntry[] = [
  { slug: 'introduccion', title: 'Introducción', category: 'Inicio', status: 'stable', since: 'v0.1', page: page(() => import('./pages/Overview')) },

  { slug: 'marca', title: 'Marca', category: 'Fundamentos', status: 'stable', since: 'v0.1', page: page(() => import('./pages/foundations/Brand')) },
  { slug: 'color', title: 'Color', category: 'Fundamentos', status: 'stable', since: 'v0.1', page: page(() => import('./pages/foundations/Colors')) },
  { slug: 'tipografia', title: 'Tipografía', category: 'Fundamentos', status: 'stable', since: 'v0.1', page: page(() => import('./pages/foundations/Typography')) },
  { slug: 'tokens', title: 'Tokens', category: 'Fundamentos', status: 'stable', since: 'v0.1', page: page(() => import('./pages/foundations/Tokens')) },

  component('button', 'Button', 'Acciones', 'stable', 'Button'),
  component('toggle', 'Toggle', 'Acciones', 'stable', 'Toggle', 'v0.3'),
  component('input', 'Input', 'Formularios', 'stable', 'Input'),
  component('textarea', 'Textarea', 'Formularios', 'stable', 'Textarea'),
  component('select', 'Select', 'Formularios', 'beta', 'Select'),
  component('checkbox', 'Checkbox', 'Formularios', 'stable', 'Checkbox'),
  component('switch', 'Switch', 'Formularios', 'stable', 'Switch'),
  component('form-field', 'Form Field', 'Formularios', 'stable', 'FormField'),
  component('floating-field', 'Floating Field', 'Formularios', 'stable', 'FloatingField', 'v0.2'),
  component('radio-group', 'Radio Group', 'Formularios', 'stable', 'RadioGroup', 'v0.2'),
  component('chips', 'Chips', 'Formularios', 'stable', 'Chips', 'v0.2'),
  component('form', 'Form', 'Formularios', 'beta', 'Form', 'v0.2'),
  component('calendar', 'Calendar', 'Formularios', 'beta', 'Calendar', 'v0.2'),
  component('date-picker', 'Date Picker', 'Formularios', 'beta', 'DatePicker', 'v0.2'),
  component('dropzone', 'Dropzone', 'Formularios', 'beta', 'Dropzone', 'v0.2'),
  component('editor', 'Editor', 'Formularios', 'experimental', 'Editor', 'v0.2'),
  component('slider', 'Slider', 'Formularios', 'stable', 'Slider', 'v0.3'),
  component('combobox', 'Combobox', 'Formularios', 'beta', 'Combobox', 'v0.3'),
  component('dialog', 'Dialog', 'Overlays', 'stable', 'Dialog'),
  component('popover', 'Popover', 'Overlays', 'stable', 'Popover'),
  component('tooltip', 'Tooltip', 'Overlays', 'stable', 'Tooltip'),
  component('dropdown-menu', 'Dropdown Menu', 'Overlays', 'beta', 'DropdownMenu'),
  component('sheet', 'Sheet', 'Overlays', 'stable', 'Sheet', 'v0.2'),
  component('command', 'Command', 'Overlays', 'stable', 'Command', 'v0.2'),
  component('alert-dialog', 'Alert Dialog', 'Overlays', 'stable', 'AlertDialog', 'v0.3'),
  component('hover-card', 'Hover Card', 'Overlays', 'stable', 'HoverCard', 'v0.3'),
  component('context-menu', 'Context Menu', 'Overlays', 'stable', 'ContextMenu', 'v0.3'),
  component('tabs', 'Tabs', 'Navegación', 'stable', 'Tabs'),
  component('breadcrumb', 'Breadcrumb', 'Navegación', 'stable', 'Breadcrumb', 'v0.3'),
  component('pagination', 'Pagination', 'Navegación', 'stable', 'Pagination', 'v0.3'),
  component('alert', 'Alert', 'Feedback', 'stable', 'Alert'),
  component('badge', 'Badge', 'Feedback', 'stable', 'Badge'),
  component('spinner', 'Spinner', 'Feedback', 'stable', 'Spinner'),
  component('skeleton', 'Skeleton', 'Feedback', 'stable', 'Skeleton'),
  component('empty-state', 'Empty State', 'Feedback', 'stable', 'EmptyState'),
  component('toaster', 'Toaster', 'Feedback', 'stable', 'Toaster', 'v0.2'),
  component('progress', 'Progress', 'Feedback', 'stable', 'Progress', 'v0.3'),
  component('avatar', 'Avatar', 'Contenido', 'stable', 'Avatar'),
  component('separator', 'Separator', 'Contenido', 'stable', 'Separator'),
  component('table', 'Table', 'Contenido', 'stable', 'Table', 'v0.2'),
  component('collapsible', 'Collapsible', 'Contenido', 'stable', 'Collapsible', 'v0.2'),
  component('scroll-area', 'Scroll Area', 'Contenido', 'stable', 'ScrollArea', 'v0.2'),
  component('accordion', 'Accordion', 'Contenido', 'stable', 'Accordion', 'v0.3'),
  component('datatable', 'DataTable', 'Datos', 'beta', 'DataTable', 'v0.3'),
  component('advanced-filter', 'Advanced Filter', 'Datos', 'beta', 'AdvancedFilter', 'v0.3'),
  component('charts', 'Charts', 'Datos', 'beta', 'Charts', 'v0.3'),
  component('stat', 'Stat', 'Datos', 'stable', 'Stat', 'v0.3.1'),
  named(layout, 'ContainerPage', 'container', 'Container', 'Layout'),
  named(layout, 'StackPage', 'stack', 'Stack', 'Layout'),
  named(layout, 'InlinePage', 'inline', 'Inline', 'Layout'),
  named(layout, 'GridPage', 'grid', 'Grid', 'Layout'),
  named(layout, 'FlexPage', 'flex', 'Flex', 'Layout'),
  named(layout, 'DividerPage', 'divider', 'Divider', 'Layout'),
  named(layout, 'AspectRatioPage', 'aspect-ratio', 'Aspect Ratio', 'Layout'),
  named(patterns, 'DashboardPage', 'dashboard', 'Dashboard', 'Patrones'),
  named(patterns, 'UsersPage', 'gestion-de-usuarios', 'Gestión de usuarios', 'Patrones'),
  named(patterns, 'CourseListPage', 'listado-con-filtros', 'Listado con filtros', 'Patrones'),
  named(patterns, 'LoadStatesPage', 'estados-de-carga', 'Carga, error y vacío', 'Patrones'),
  named(hooks, 'DisclosurePage', 'usedisclosure', 'useDisclosure', 'Hooks'),
  named(hooks, 'MediaQueryPage', 'usemediaquery', 'useMediaQuery', 'Hooks'),
  named(hooks, 'DebouncePage', 'usedebouncedvalue', 'useDebouncedValue', 'Hooks'),
  named(hooks, 'InViewPage', 'useinview', 'useInView', 'Hooks'),
  named(hooks, 'HotkeyPage', 'usehotkey', 'useHotkey', 'Hooks'),
  named(hooks, 'ThemePage', 'usetheme', 'useTheme', 'Hooks'),
  named(hooks, 'FormatPage', 'utilidades', 'Utilidades', 'Hooks'),
]

export const categories = [...new Set(registry.map((e) => e.category))]

export function findEntry(slug: string) {
  return registry.find((e) => e.slug === slug)
}

export function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}
