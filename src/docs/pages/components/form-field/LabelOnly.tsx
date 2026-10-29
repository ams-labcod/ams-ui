import { Input, Label } from '@ams-labcod/ams-ui'

// Label suelto, para cuando la estructura no encaja en FormField.
export default function LabelOnly() {
  return (
    <div className="flex w-full max-w-md items-center gap-3">
      <Label htmlFor="nota-final" className="shrink-0">
        Nota final
      </Label>
      <Input id="nota-final" type="number" min={0} max={10} step={0.1} defaultValue={8.7} className="w-28" />
    </div>
  )
}
