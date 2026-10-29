import { ComponentDoc, loadExamples } from '../../ComponentDoc'
import { Code } from '../../kit'

const examples = loadExamples(
  import.meta.glob('./dropzone/*.tsx', { eager: true }),
  import.meta.glob('./dropzone/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

export default function DropzoneDoc() {
  return (
    <ComponentDoc
      slug="dropzone"
      description="Zona para arrastrar archivos o elegirlos del equipo. Valida tipo, tamaño y cantidad antes de subir y explica cada rechazo."
      importCode={`import { Dropzone, DropzoneFile, validateFiles } from '@ams-labcod/ams-ui'`}
      examples={examples}
      sections={[
        {
          name: 'Upload',
          title: 'Subida con progreso y errores',
          description: <>Arrastra varios archivos, incluido alguno que no sea PDF ni imagen. La subida es simulada; en tu app, sube los <Code>accepted</Code> y actualiza el estado de cada fila.</>,
        },
      ]}
      api={[
        {
          component: 'Dropzone',
          props: [
            { name: 'onFiles', type: '(accepted: File[], rejected: RejectedFile[]) => void', description: 'Archivos válidos y rechazados con su motivo.' },
            { name: 'accept', type: 'string', description: 'Como el atributo HTML: ".pdf,image/*".' },
            { name: 'maxSize', type: 'number', description: 'Bytes por archivo.' },
            { name: 'maxFiles', type: 'number', description: 'Máximo por entrega.' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite varios archivos.' },
            { name: 'hint', type: 'ReactNode', description: 'Qué se admite. Se lee al enfocar.' },
            { name: 'label', type: 'string', default: "'Subir archivos'", description: 'Nombre accesible del selector.' },
            { name: 'disabled', type: 'boolean', description: 'Bloquea la zona.' },
          ],
        },
        {
          component: 'DropzoneFile',
          props: [
            { name: 'name, size', type: 'string, number', description: 'Datos del archivo.' },
            { name: 'status', type: "'uploading' | 'done' | 'error'", description: 'Estado de la fila.' },
            { name: 'progress', type: 'number', description: '0–100 mientras sube.' },
            { name: 'error', type: 'ReactNode', description: 'Motivo del fallo.' },
            { name: 'onRemove', type: '() => void', description: 'Muestra el botón de quitar.' },
          ],
          extends: 'Es un <li>: ponlo dentro de un <ul>.',
        },
        { component: 'validateFiles(files, rules)', props: [{ name: 'rules', type: 'FileRules', description: 'La misma validación, para usarla fuera del componente (p. ej. al pegar archivos).' }] },
      ]}
      a11y={[
        'Por dentro es un <input type="file">: se enfoca con Tab y se abre con Enter o Espacio. Arrastrar es opcional.',
        'El anillo de foco rodea toda la zona.',
        'El progreso de cada archivo es un progressbar con su nombre.',
        'Los rechazos se muestran como texto en la fila, no solo en rojo.',
      ]}
      dos={['Di qué se admite antes de que la persona lo intente (hint).', 'Explica cada rechazo con el motivo y el límite.']}
      donts={['No rechaces en silencio.', 'No subas automáticamente archivos sensibles sin confirmación.']}
      limitations={['No sube archivos: entrega los File y tú gestionas la subida y el progreso.']}
    />
  )
}
