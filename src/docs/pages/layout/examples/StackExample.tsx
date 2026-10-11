import { Button, FormField, Input, Stack, Textarea } from '@ams/ui'

export default function StackExample() {
  return (
    <Stack as="form" gap={5} className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FormField label="Asunto">
        <Input defaultValue="Salida pedagógica al museo" />
      </FormField>
      <FormField label="Mensaje">
        <Textarea rows={3} />
      </FormField>
      <Button type="submit" className="self-start">
        Enviar a acudientes
      </Button>
    </Stack>
  )
}
