import { Button, toast } from '@juanarenas312002/ams-ui'

export default function Progress() {
  function sendReports() {
    // El mismo id reemplaza la notificación en lugar de apilar otra.
    toast('Enviando 312 boletines…', { id: 'boletines', duration: Infinity })
    setTimeout(() => toast.success('Boletines enviados', { id: 'boletines', description: '312 acudientes los recibieron por correo.' }), 2000)
  }

  return <Button onClick={sendReports}>Enviar boletines</Button>
}
