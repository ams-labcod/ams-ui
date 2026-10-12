import { Logo } from '../../../components/brand/Logo'
import logoSrc from '../../../assets/logo.png'
import { CodeBlock, DocHeader, DocSection, DoDont, Preview, SpecTable } from '../../kit'

const dos = [
  'Usa el logotipo completo (isotipo y nombre) en la navegación principal y en el pie.',
  'Usa solo el isotipo cuando falte espacio: favicon, avatar de la app, barra lateral plegada.',
  'Respeta el margen de protección: un cuarto del ancho del isotipo por cada lado.',
]
const donts = [
  'No recolorees el isotipo ni le cambies la forma circular.',
  'No lo pongas sobre fotografías o fondos con mucho detalle.',
  'No lo uses por debajo de 24 px: la cruz de la «A+» deja de leerse.',
]

export default function Brand() {
  return (
    <>
      <DocHeader
        title="Marca"
        status="stable"
        since="v0.1"
        description="El isotipo de AMS es una «A+» turquesa sobre un círculo azul marino: la nota más alta. Hay una sola versión, que funciona sobre los dos temas."
      />

      <DocSection title="Logotipo" description="El componente Logo une el isotipo, el nombre y el subtítulo. Tiene tres tamaños.">
        <div className="grid gap-4 md:grid-cols-2">
          {(['dark', 'light'] as const).map((t) => (
            <div key={t} data-theme={t} className="flex flex-col gap-6 rounded-lg border border-border bg-bg p-6 text-fg">
              <span className="text-xs text-fg-subtle">Tema {t === 'dark' ? 'oscuro' : 'claro'}</span>
              <Logo size="lg" />
              <Logo size="md" />
              <Logo size="sm" />
            </div>
          ))}
        </div>
        <CodeBlock
          code={`import { Logo } from '@juanarenas312002/ams-ui'

<Logo />                         // md, con nombre y "Academic Manager"
<Logo size="sm" subtitle="UI" /> // subtítulo propio
<Logo wordmark={false} />        // solo isotipo (alt="AMS")`}
        />
      </DocSection>

      <DocSection title="Margen de protección" description="Deja libre alrededor del isotipo al menos un cuarto de su ancho. En la navegación (36 px) son 9 px.">
        <Preview className="flex flex-wrap items-center gap-10">
          <div className="relative p-6 outline-1 outline-accent outline-dashed">
            <img src={logoSrc} alt="" className="size-24" />
            <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-2xs text-accent">¼</span>
          </div>
          <SpecTable
            head={['Uso', 'Tamaño']}
            rows={[
              ['Navegación', '36 px'],
              ['Barra compacta', '28 px'],
              ['Presentación', '56 px o más'],
              ['Mínimo', '24 px'],
            ]}
          />
        </Preview>
      </DocSection>

      <DocSection title="Uso">
        <DoDont dos={dos} donts={donts} />
      </DocSection>
    </>
  )
}
