import { Button, Divider, Stack } from '@juanarenas312002/ams-ui'

export default function DividerExample() {
  return (
    <Stack gap={4} className="w-full max-w-sm">
      <Button size="lg">Ingresar con correo institucional</Button>
      <Divider label="o" />
      <Button size="lg" variant="secondary">
        Ingresar con Google
      </Button>
    </Stack>
  )
}
