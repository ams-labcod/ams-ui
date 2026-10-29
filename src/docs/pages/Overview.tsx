import { CodeBlock, Code, DocHeader, DocSection, SpecTable, StatusPill } from '../kit'
import { registry, type Version } from '../registry'

const milestones: { version: Version; scope: string }[] = [
  { version: 'v0.1', scope: 'Fundamentos y componentes esenciales: botones, campos, overlays, pestañas y feedback.' },
  { version: 'v0.2', scope: 'Formularios avanzados, calendario, Sheet, Command, Dropzone, Editor, Table y Toaster.' },
  { version: 'v0.3', scope: 'Componentes avanzados, DataTable, filtros avanzados y gráficos.' },
  { version: 'v0.3.1', scope: 'Primitivas de layout y patrones completos.' },
]

export default function Overview() {
  const count = (v: Version) => {
    const items = registry.filter((e) => e.since === v)
    return `${items.filter((e) => e.status !== 'planned').length} de ${items.length}`
  }

  return (
    <>
      <DocHeader
        title="AMS UI"
        description="Componentes de React para construir las pantallas de AMS, el sistema de gestión académica. Comparten los colores, la tipografía y el vidrio de la marca, funcionan con teclado y vienen en tema oscuro y claro."
      />

      <DocSection title="Instalación" description="En un proyecto de React 19 con Vite y Tailwind CSS v4:">
        <CodeBlock
          code={`npm i @ams-labcod/ams-ui
npm i -D tailwindcss @tailwindcss/vite`}
        />
        <p className="mt-4 max-w-prose text-sm text-fg-muted">
          El resto de dependencias (Radix, cmdk, recharts, TanStack Table, react-hook-form, zod…) se instalan solas con el paquete.
        </p>
      </DocSection>

      <DocSection title="Configuración" description="Importa los tokens una sola vez, en tu CSS de entrada. Ya incluyen Tailwind, así que reemplazan tu @import 'tailwindcss'.">
        <CodeBlock
          label="CSS"
          code={`/* src/index.css */
@import '@ams-labcod/ams-ui/tokens.css';
/* Tailwind debe ver las clases que usan los componentes: */
@source '../node_modules/@ams-labcod/ams-ui/dist-lib';`}
        />
        <p className="mt-5 max-w-prose text-sm text-fg-muted">
          Carga las fuentes Space Grotesk e Inter en tu <Code>index.html</Code>:
        </p>
        <CodeBlock
          label="HTML"
          code={`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />`}
        />
      </DocSection>

      <DocSection
        title="Temas"
        description="El tema lo decide el atributo data-theme. Sin atributo se usa el oscuro, que es el original de la marca. Puedes fijarlo en <html> o en cualquier contenedor para mostrar una zona con el otro tema."
      >
        <CodeBlock
          code={`import { useTheme } from '@ams-labcod/ams-ui'

function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Tema {theme === 'dark' ? 'claro' : 'oscuro'}</button>
}`}
        />
      </DocSection>

      <DocSection title="Estados" description="Cada página indica cuánto puedes confiar en el componente.">
        <SpecTable
          head={['Estado', 'Qué significa']}
          rows={[
            [<StatusPill status="stable" />, 'API cerrada, probada y accesible con teclado. Úsalo en producción.'],
            [<StatusPill status="beta" />, 'Funciona y está probado, pero su API aún puede cambiar.'],
            [<StatusPill status="experimental" />, 'Funciona para casos básicos; tiene limitaciones conocidas y documentadas.'],
            [<StatusPill status="planned" />, 'Todavía no existe. La página indica en qué versión llegará.'],
          ]}
        />
      </DocSection>

      <DocSection title="Hoja de ruta">
        <SpecTable
          head={['Versión', 'Alcance', 'Disponibles']}
          rows={milestones.map((m) => [m.version, m.scope, count(m.version)])}
        />
      </DocSection>
    </>
  )
}
