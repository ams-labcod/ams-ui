import { Separator } from '@ams-labcod/ams-ui'

export default function Usage() {
  return (
    <div className="w-full max-w-sm">
      <p className="font-display font-semibold">Pensión · Abril</p>
      <p className="text-sm text-fg-muted">Vence el 5 de abril</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm text-fg-muted">
        <span>$ 850.000</span>
        <Separator orientation="vertical" />
        <span>Pagado</span>
        <Separator orientation="vertical" decorative />
        <span>Recibo 0142</span>
      </div>
    </div>
  )
}
