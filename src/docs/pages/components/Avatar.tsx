import { ComponentDoc, loadExamples } from '../../ComponentDoc'

const examples = loadExamples(
  import.meta.glob('./avatar/*.tsx', { eager: true }),
  import.meta.glob('./avatar/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function AvatarDoc() {
  return (
    <ComponentDoc
      slug="avatar"
      description="Representa a una persona con su foto o, si no hay, con sus iniciales sobre el degradado turquesa de la marca, como los avatares de roles y testimonios de la referencia."
      importCode={`import { Avatar } from '@juanarenas312002/ams-ui'`}
      examples={examples}
      sections={[
        { name: 'Sizes', title: 'Tamaños y respaldo', description: 'El último avatar apunta a una imagen que no existe y muestra las iniciales.' },
        { name: 'Group', title: 'Grupo', description: 'Superpuestos con un anillo del color de fondo para separarlos.' },
      ]}
      api={[
        {
          component: 'Avatar',
          props: [
            { name: 'name', type: 'string', description: 'Nombre de la persona: texto alternativo e iniciales.' },
            { name: 'src', type: 'string', description: 'URL de la foto.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '32, 40 o 56 px.' },
          ],
          extends: 'Acepta los atributos de <span>. initials(name) está exportada por si necesitas las iniciales en otro sitio.',
        },
      ]}
      a11y={['Se anuncia como imagen con el nombre de la persona (role="img" y aria-label).', 'Si el nombre ya aparece al lado, añade aria-hidden para no leerlo dos veces.']}
      dos={['Acompáñalo del nombre cuando la persona no sea obvia por el contexto.']}
      donts={['No uses iniciales de un solo color distinto por persona: el degradado de marca es el mismo para todos.']}
    />
  )
}
