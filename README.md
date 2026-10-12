# AMS UI

Librería de componentes de React para AMS, el sistema de gestión académica. Usa la identidad visual de la landing de AMS (azul marino, turquesa, vidrio, Space Grotesk e Inter), funciona con teclado, cumple WCAG 2.2 AA y viene en tema oscuro y claro.

Incluye 70 páginas de documentación con ejemplos que se ejecutan: `npm run dev`.

## Contenido

| Grupo | Piezas |
|---|---|
| Fundamentos | Tokens de color, tipografía, radios, sombras, movimiento y capas; logo; fondo aurora |
| Acciones y formularios | Button, Toggle, Input, Textarea, Select, Checkbox, Switch, FormField, FloatingField, RadioGroup, Chips, Form (react-hook-form + zod), Calendar, DatePicker, Dropzone, Editor, Slider, Combobox |
| Overlays | Dialog, AlertDialog, Sheet, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, Command |
| Navegación y feedback | Tabs, Breadcrumb, Pagination, Alert, Badge, Toaster, Progress, Spinner, Skeleton, EmptyState |
| Datos | Table, DataTable (TanStack Table v8), AdvancedFilter, gráficos de línea, área, barras y donut (recharts), Stat |
| Layout | Container, Stack, Inline, Grid, Flex, Divider, AspectRatio |
| Hooks y utilidades | useTheme, useDisclosure, useMediaQuery, useDebouncedValue, useInView, useHotkey, `cn`, formato con Intl, fechas |

Cada componente tiene en la documentación un estado (estable, beta o experimental) y sus limitaciones conocidas.

## Usarlo en una app

Requisitos: React 19 y Tailwind CSS v4.

```bash
npm i @juanarenas312002/ams-ui
npm i -D tailwindcss @tailwindcss/vite
```

En el CSS de entrada de tu app, en lugar de `@import 'tailwindcss'`:

```css
@import '@juanarenas312002/ams-ui/tokens.css';
@source '../node_modules/@juanarenas312002/ams-ui/dist-lib';
```

Carga Space Grotesk e Inter (en la documentación, Introducción, está el `<link>` exacto) y aplica el tema antes del primer pintado con el script de `index.html`.

```tsx
import { Button, FormField, Input, toast, Toaster } from '@juanarenas312002/ams-ui'

export function App() {
  return (
    <>
      <FormField label="Correo del acudiente">
        <Input type="email" />
      </FormField>
      <Button onClick={() => toast.success('Guardado')}>Guardar</Button>
      <Toaster />
    </>
  )
}
```

## Desarrollo

| Comando | Qué hace |
|---|---|
| `npm run dev` | Documentación en local |
| `npm run check` | Tipos, lint (oxlint), pruebas (Vitest) y build de la documentación |
| `npm run build:lib` | Paquete en `dist-lib/`: ESM, tipos `.d.ts` y `tokens.css` |
| `npm run smoke` | Importa `dist-lib` y renderiza componentes, como lo haría una app |
| `npm run a11y` | axe-core sobre todas las páginas de la documentación, en ambos temas (necesita Chrome; `CHROME_PATH` para otra ruta) |
| `npm run check:release` | Todo lo anterior, en orden |

### Estructura

```
src/
  styles/tokens.css        Todos los valores visuales (@theme de Tailwind v4)
  components/ui/           Componentes de interfaz, un directorio por componente
  components/data/         DataTable, AdvancedFilter, Charts, Stat
  components/layout/       Primitivas de composición
  components/brand/        Logo y Aurora
  hooks/  lib/             Hooks y utilidades
  index.ts                 API pública
  docs/                    App de documentación (no se publica)
```

### Convenciones

- Los componentes solo usan utilidades semánticas (`bg-surface`, `text-fg-muted`, `border-accent-border`); nunca colores crudos.
- En JavaScript usa las variables `--ams-*`: las `--color-*` de `@theme inline` no existen en tiempo de ejecución.
- Una animación nueva necesita su token `--animate-*`; si no, Tailwind no publica su `@keyframes`.
- Cada ejemplo de la documentación es un archivo `.tsx` real: se renderiza y se muestra su código tal cual.
- Al añadir un componente: su página en `src/docs/pages/components/`, su entrada en `src/docs/registry.ts` con el estado honesto, sus pruebas y una línea en `CHANGELOG.md`.

Historial y decisiones de diseño: [CHANGELOG.md](CHANGELOG.md).
