import { Spinner } from '@juanarenas312002/ams-ui'

export default function Sizes() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" label="Cargando estudiantes" />
      <span className="inline-flex items-center gap-2 text-sm text-fg-muted">
        <Spinner size="sm" className="text-fg-subtle" />
        Sincronizando con Google Calendar…
      </span>
    </>
  )
}
