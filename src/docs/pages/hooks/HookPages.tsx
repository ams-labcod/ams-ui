// Páginas de hooks y utilidades: comparten plantilla, cada export es una página.
import type { ReactNode } from 'react'
import { ComponentDoc, loadExamples, type ApiGroup } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./examples/*.tsx', { eager: true }),
  import.meta.glob('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

interface HookDocProps {
  slug: string
  importCode: string
  example: string
  exampleTitle: string
  description: ReactNode
  api: ApiGroup[]
  notes: ReactNode[]
  dos: ReactNode[]
  donts: ReactNode[]
  limitations?: ReactNode[]
}

function HookDoc({ example, exampleTitle, notes, ...p }: HookDocProps) {
  return <ComponentDoc {...p} apiTitle="API" examples={examples} sections={[{ name: example, title: exampleTitle }]} a11y={notes} />
}

export const DisclosurePage = () => (
  <HookDoc
    slug="usedisclosure"
    importCode={`import { useDisclosure } from '@ams-labcod/ams-ui'`}
    example="DisclosureExample"
    exampleTitle="Controlar un panel"
    description="Estado abierto o cerrado para diálogos, paneles y secciones, con funciones estables para abrir, cerrar y alternar."
    api={[
      {
        component: 'useDisclosure(initial?)',
        props: [
          { name: 'initial', type: 'boolean', default: 'false', description: 'Estado inicial.' },
          { name: '→ open', type: 'boolean', description: 'Estado actual.' },
          { name: '→ onOpen, onClose, onToggle', type: '() => void', description: 'Funciones estables (no cambian entre renders).' },
          { name: '→ setOpen', type: '(open: boolean) => void', description: 'Encaja directo en onOpenChange de Dialog, Sheet o Popover.' },
        ],
      },
    ]}
    notes={['El overlay sigue gestionando el foco: al cerrar con onClose, Radix devuelve el foco al disparador si lo hay.']}
    dos={['Úsalo cuando varios botones abren el mismo overlay o cuando lo abres desde código.']}
    donts={['Si solo lo abre su propio Trigger, no necesitas estado: deja el componente sin controlar.']}
  />
)

export const MediaQueryPage = () => (
  <HookDoc
    slug="usemediaquery"
    importCode={`import { useMediaQuery } from '@ams-labcod/ams-ui'`}
    example="MediaQueryExample"
    exampleTitle="Ancho y preferencias"
    description="Devuelve si una media query coincide y se actualiza al cambiar: ancho de pantalla, movimiento reducido, esquema de color."
    api={[
      {
        component: 'useMediaQuery(query, serverValue?)',
        props: [
          { name: 'query', type: 'string', description: 'Media query de CSS. Los puntos de corte de AMS: 40rem (sm), 55rem (md), 61.25rem (lg), 77.5rem (xl).' },
          { name: 'serverValue', type: 'boolean', default: 'false', description: 'Valor en renderizado de servidor.' },
          { name: '→', type: 'boolean', description: '¿Coincide?' },
        ],
      },
    ]}
    notes={['Úsalo para respetar prefers-reduced-motion en animaciones hechas con JavaScript (las de CSS ya se desactivan solas).']}
    dos={['Prefiere clases responsive de Tailwind para cambios visuales; usa el hook cuando cambia el comportamiento (Sheet en móvil, Popover en escritorio).']}
    donts={['No renderices árboles distintos solo para cambiar estilos.']}
  />
)

export const DebouncePage = () => (
  <HookDoc
    slug="usedebouncedvalue"
    importCode={`import { useDebouncedValue } from '@ams-labcod/ams-ui'`}
    example="DebounceExample"
    exampleTitle="Búsqueda sin una petición por tecla"
    description="Devuelve el valor solo cuando deja de cambiar durante un tiempo. Evita enviar una petición por cada tecla al buscar."
    api={[
      {
        component: 'useDebouncedValue(value, delay?)',
        props: [
          { name: 'value', type: 'T', description: 'Valor que cambia a menudo.' },
          { name: 'delay', type: 'number', default: '300', description: 'Milisegundos sin cambios antes de entregar el valor.' },
          { name: '→', type: 'T', description: 'El último valor estable.' },
        ],
      },
    ]}
    notes={['El campo sigue respondiendo al instante: solo se retrasa el trabajo caro (la petición).', 'Si muestras resultados que se actualizan, anúncialos con aria-live.']}
    dos={['300–500 ms para búsquedas.']}
    donts={['No lo uses para validar formularios: valida al salir del campo.']}
  />
)

export const InViewPage = () => (
  <HookDoc
    slug="useinview"
    importCode={`import { useInView } from '@ams-labcod/ams-ui'`}
    example="InViewExample"
    exampleTitle="Cargar al hacer scroll"
    description="Indica si un elemento está en pantalla (IntersectionObserver). Para cargar contenido solo cuando se va a ver o revelar una sección al entrar."
    api={[
      {
        component: 'useInView(options?)',
        props: [
          { name: 'once', type: 'boolean', default: 'false', description: 'Deja de observar tras la primera vez visible.' },
          { name: 'root, rootMargin, threshold', type: 'IntersectionObserverInit', description: 'Opciones del observador.' },
          { name: '→ [ref, inView]', type: '[RefObject<T>, boolean]', description: 'Asigna ref al elemento.' },
        ],
      },
    ]}
    notes={['Si animas la entrada, respeta prefers-reduced-motion.', 'El contenido cargado tarde debe tener un esqueleto del mismo tamaño para que la página no salte.']}
    dos={['Listas largas de reportes, imágenes o gráficos pesados.']}
    donts={['No escondas contenido importante hasta que se haga scroll: los lectores de pantalla no lo verán.']}
  />
)

export const HotkeyPage = () => (
  <HookDoc
    slug="usehotkey"
    importCode={`import { useHotkey } from '@ams-labcod/ams-ui'`}
    example="HotkeyExample"
    exampleTitle="Atajo global"
    description="Registra un atajo de teclado global. «mod» es ⌘ en Mac y Ctrl en el resto. Esta documentación lo usa para Ctrl K y «/»."
    api={[
      {
        component: 'useHotkey(combo, handler, options?)',
        props: [
          { name: 'combo', type: 'string', description: '"mod+k", "alt+n", "shift+?", "escape", "/".' },
          { name: 'handler', type: '(e: KeyboardEvent) => void', description: 'Siempre se llama la versión más reciente (no hace falta useCallback).' },
          { name: 'inInputs', type: 'boolean', default: 'false', description: 'Activo también mientras se escribe. Con Ctrl/⌘ siempre lo está.' },
          { name: 'enabled', type: 'boolean', default: 'true', description: 'Activa o desactiva el atajo.' },
        ],
      },
      { component: 'matchesHotkey(event, combo)', props: [{ name: '→', type: 'boolean', description: 'La comparación, para usarla en tus propios manejadores.' }] },
    ]}
    notes={['Un atajo de una sola tecla no se dispara mientras se escribe en un campo.', 'Indica el atajo en la interfaz (aria-keyshortcuts y un <kbd> visible).', 'No uses atajos que ya usa el navegador o el lector de pantalla.']}
    dos={['Atajos para acciones frecuentes, siempre con un botón visible equivalente.']}
    donts={['No reasignes Ctrl+C, Ctrl+V, Ctrl+F ni Tab.']}
  />
)

export const ThemePage = () => (
  <HookDoc
    slug="usetheme"
    importCode={`import { useTheme } from '@ams-labcod/ams-ui'`}
    example="ThemeExample"
    exampleTitle="Selector de tema"
    description="Lee y cambia el tema (oscuro o claro). El estado vive en el atributo data-theme de <html>: cualquier componente que use el hook se entera del cambio sin provider."
    api={[
      {
        component: 'useTheme()',
        props: [
          { name: '→ theme', type: "'dark' | 'light'", description: 'Tema actual.' },
          { name: '→ setTheme', type: '(theme) => void', description: 'Aplica y guarda la preferencia (localStorage).' },
          { name: '→ toggleTheme', type: '() => void', description: 'Alterna.' },
        ],
      },
      { component: 'resolveTheme / applyTheme / readTheme', props: [{ name: '—', type: '—', description: 'Las funciones sin React, para scripts previos al primer pintado.' }] },
    ]}
    notes={['Sin preferencia guardada se respeta la del sistema (prefers-color-scheme).', 'El botón que cambia el tema debe decir a qué tema cambia («Cambiar a tema claro»).']}
    dos={['Aplica el tema con un script en el <head> para evitar el destello inicial (ver Introducción).']}
    donts={['No guardes el tema en estado de React: el DOM es la fuente.']}
  />
)

export const FormatPage = () => (
  <HookDoc
    slug="utilidades"
    importCode={`import { cn, formatNumber, formatCurrency, formatBytes, formatDate, dates } from '@ams-labcod/ams-ui'`}
    example="FormatExample"
    exampleTitle="Formato en español"
    description="Utilidades sin React: combinar clases, y formatear números, moneda, tamaños y fechas con Intl en español por defecto."
    api={[
      {
        component: 'Funciones',
        props: [
          { name: 'cn(...classes)', type: 'string', description: 'Une clases condicionales y resuelve conflictos de Tailwind (la última gana), incluida la escala tipográfica propia.' },
          { name: 'formatNumber(n, locale?, options?)', type: 'string', description: 'Separadores del idioma: 1.250.000.' },
          { name: 'formatCurrency(n, currency?, locale?)', type: 'string', description: 'Por defecto pesos colombianos sin decimales.' },
          { name: 'formatBytes(n, locale?)', type: 'string', description: 'Base 1000: 1,5 kB, 5 MB.' },
          { name: 'formatDate(date, locale?, options?)', type: 'string', description: 'Por defecto «5 abr 2026».' },
          { name: 'dates.*', type: '—', description: 'addDays, addMonths, startOfWeek (lunes), monthWeeks, isSameDay, clampDate, weekdayNames.' },
        ],
      },
    ]}
    notes={['Formatear con el idioma correcto también es accesibilidad: los lectores leen 1.250.000 como «un millón doscientos cincuenta mil».']}
    dos={['Formatea en el borde (al mostrar); guarda números y fechas sin formato.']}
    donts={['No construyas cadenas de moneda a mano.']}
  />
)
