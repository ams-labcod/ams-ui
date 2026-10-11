import { Alert } from '@ams/ui'

export default function Variants() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert variant="info" title="El segundo período empieza el 3 de junio">
        Las notas del primer período quedan cerradas para edición.
      </Alert>
      <Alert variant="success" title="Boletines enviados">
        312 acudientes recibieron el boletín por correo.
      </Alert>
      <Alert variant="warning" title="Faltan 6 calificaciones">
        Completa la libreta de 3.º A antes del viernes para cerrar el período.
      </Alert>
      <Alert variant="danger" title="No se pudo importar el archivo">
        La fila 14 no tiene documento de identidad. Corrígela y vuelve a subir el archivo.
      </Alert>
    </div>
  )
}
