import { Button, toast } from '@ams/ui'

export default function Variants() {
  return (
    <>
      <Button variant="secondary" onClick={() => toast.success('Calificaciones guardadas', { description: '32 notas de Matemáticas · 3.º A.' })}>
        Éxito
      </Button>
      <Button variant="secondary" onClick={() => toast.info('Nuevo período habilitado', { description: 'Ya puedes registrar notas del segundo período.' })}>
        Información
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('Sesión a punto de expirar', { description: 'Guarda tus cambios en los próximos 2 minutos.' })}>
        Advertencia
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.danger('No se pudo enviar el boletín', {
            description: 'El correo del acudiente rebotó.',
            duration: Infinity,
            action: { label: 'Corregir correo', onClick: () => toast('Abre la ficha del estudiante para corregirlo.') },
          })
        }
      >
        Error con acción
      </Button>
    </>
  )
}
