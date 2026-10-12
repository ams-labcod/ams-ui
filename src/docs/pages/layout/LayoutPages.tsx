// Las siete primitivas de layout comparten plantilla; cada export es una página.
import type { ReactNode } from 'react'
import { ComponentDoc, loadExamples, type ApiGroup } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./examples/*.tsx', { eager: true }),
  import.meta.glob('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

const gapProp = { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', description: 'Separación en la escala de espaciado (4 px por paso).' }
const asProp = { name: 'as', type: 'ElementType', default: "'div'", description: 'Elemento HTML a renderizar: section, ul, form…' }

function LayoutDoc({ slug, name, description, exampleTitle, api, dos, donts }: { slug: string; name: string; description: ReactNode; exampleTitle: string; api: ApiGroup[]; dos: ReactNode[]; donts: ReactNode[] }) {
  return (
    <ComponentDoc
      slug={slug}
      description={description}
      importCode={`import { ${name} } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[{ name: `${name}Example`, title: exampleTitle, previewClassName: 'block' }]}
      api={api}
      a11y={['Es un contenedor sin semántica propia; usa as para el elemento correcto (section, nav, ul, form).', 'El orden visual sigue al del código: no reordenes con CSS lo que el lector de pantalla leerá en otro orden.']}
      dos={dos}
      donts={donts}
    />
  )
}

export const ContainerPage = () => (
  <LayoutDoc
    slug="container"
    name="Container"
    description="Centra el contenido con el ancho máximo de la marca (1240 px, como la referencia) y márgenes laterales de 24 px (16 px en móvil)."
    exampleTitle="Anchos"
    api={[{ component: 'Container', props: [{ name: 'size', type: "'prose' | 'narrow' | 'page' | 'full'", default: "'page'", description: 'prose ≈ 65 caracteres para texto, narrow 768 px para formularios, page 1240 px.' }, asProp] }]}
    dos={['Un Container por sección de página.', 'size="prose" para textos largos.']}
    donts={['No anides Containers.']}
  />
)

export const StackPage = () => (
  <LayoutDoc
    slug="stack"
    name="Stack"
    description="Apila elementos en vertical con una separación uniforme. Sustituye a los márgenes sueltos entre bloques."
    exampleTitle="Formulario apilado"
    api={[{ component: 'Stack', props: [{ ...gapProp, default: '4' }, { name: 'align, justify', type: '—', description: 'Alineación como en Flex.' }, asProp] }]}
    dos={['Usa la misma separación para elementos del mismo nivel.']}
    donts={['No mezcles gap con márgenes en los hijos.']}
  />
)

export const InlinePage = () => (
  <LayoutDoc
    slug="inline"
    name="Inline"
    description="Pone elementos en fila y los pasa a la siguiente línea si no caben: badges, botones, metadatos."
    exampleTitle="Etiquetas y acciones"
    api={[{ component: 'Inline', props: [{ ...gapProp, default: '2' }, { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", description: 'Distribución horizontal.' }, { name: 'align', type: '—', default: "'center'", description: 'Alineación vertical.' }, { name: 'wrap', type: 'boolean', default: 'true', description: 'Salto de línea.' }, asProp] }]}
    dos={['Acciones de un formulario: Inline con justify="end".']}
    donts={['Para columnas que deben alinearse entre filas usa Grid.']}
  />
)

export const GridPage = () => (
  <LayoutDoc
    slug="grid"
    name="Grid"
    description="Cuadrícula con columnas fijas por punto de corte, o automáticas según un ancho mínimo. Los puntos de corte son los de la referencia: 880 y 980 px."
    exampleTitle="Columnas por punto de corte y automáticas"
    api={[
      {
        component: 'Grid',
        props: [
          { name: 'columns', type: '1–6 | 12 | { base, sm, md, lg }', default: '1', description: 'Columnas, fijas o por punto de corte.' },
          { name: 'minItemWidth', type: 'string', description: 'Columnas automáticas con este ancho mínimo ("16rem"). Ignora columns.' },
          { ...gapProp, default: '4' },
          asProp,
        ],
      },
    ]}
    dos={['minItemWidth para tarjetas de ancho flexible; columns para diseños fijos.']}
    donts={['No uses Grid para una sola fila de botones: es Inline.']}
  />
)

export const FlexPage = () => (
  <LayoutDoc
    slug="flex"
    name="Flex"
    description="La primitiva flexible completa. Stack e Inline son atajos de Flex; úsala cuando necesites dirección o distribución que ellos no fijan."
    exampleTitle="Fila con extremos"
    api={[
      {
        component: 'Flex',
        props: [
          { name: 'direction', type: "'row' | 'column' | 'row-reverse' | 'column-reverse'", default: "'row'", description: 'Dirección.' },
          { ...gapProp, default: '0' },
          { name: 'align', type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'", description: 'Eje cruzado.' },
          { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", description: 'Eje principal.' },
          { name: 'wrap', type: 'boolean', default: 'false', description: 'Salto de línea.' },
          asProp,
        ],
      },
    ]}
    dos={['Prefiere Stack o Inline cuando encajan: el código dice la intención.']}
    donts={['No uses row-reverse para cambiar el orden de lectura.']}
  />
)

export const DividerPage = () => (
  <LayoutDoc
    slug="divider"
    name="Divider"
    description="Línea divisoria con una etiqueta en el centro, por ejemplo «o» entre dos formas de ingresar. Sin etiqueta equivale a Separator."
    exampleTitle="Entre dos opciones"
    api={[{ component: 'Divider', props: [{ name: 'label', type: 'ReactNode', description: 'Texto centrado sobre la línea.' }], extends: 'Acepta los atributos de <div>. Tiene role="separator".' }]}
    dos={['Etiquetas de una o dos palabras.']}
    donts={['No lo uses entre cada elemento de una lista.']}
  />
)

export const AspectRatioPage = () => (
  <LayoutDoc
    slug="aspect-ratio"
    name="AspectRatio"
    description="Reserva el alto según el ancho para imágenes, vídeos y mapas, de modo que la página no salte cuando cargan. Usa aspect-ratio de CSS, sin JavaScript."
    exampleTitle="16 : 9 y cuadrado"
    api={[{ component: 'AspectRatio', props: [{ name: 'ratio', type: 'number', default: '16 / 9', description: 'Ancho entre alto.' }], extends: 'Las <img> hijas ocupan todo el espacio con object-cover.' }]}
    dos={['Ponlo en imágenes de tamaño desconocido.']}
    donts={['No lo uses en contenedores de texto: el texto puede no caber.']}
  />
)
