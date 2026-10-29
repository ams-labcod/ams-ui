import { ProgressRing } from '@ams-labcod/ams-ui'

// El anillo de asistencia del bento de la referencia.
export default function Ring() {
  return (
    <div className="flex items-center gap-5">
      <ProgressRing label="Asistencia de octubre" value={94} />
      <dl className="grid grid-cols-[auto_auto] gap-x-2 text-xs leading-relaxed text-fg-muted">
        <dd className="font-semibold text-fg tabular-nums">312</dd>
        <dt>presentes</dt>
        <dd className="font-semibold text-fg tabular-nums">14</dd>
        <dt>ausentes</dt>
        <dd className="font-semibold text-fg tabular-nums">6</dd>
        <dt>justificados</dt>
      </dl>
      <ProgressRing label="Cartera recaudada" value={62} tone="warning" size={64} />
    </div>
  )
}
