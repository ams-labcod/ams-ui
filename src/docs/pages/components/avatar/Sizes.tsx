import { Avatar } from '@juanarenas312002/ams-ui'

export default function Sizes() {
  return (
    <>
      <Avatar size="sm" name="Carolina Reyes" />
      <Avatar size="md" name="Javier Molina" />
      <Avatar size="lg" name="Patricia Delgado" />
      {/* Si la imagen falla, vuelve a las iniciales. */}
      <Avatar size="lg" name="Mateo Cárdenas" src="/no-existe.jpg" />
    </>
  )
}
