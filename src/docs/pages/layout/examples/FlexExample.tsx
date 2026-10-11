import { Avatar, Button, Flex } from '@ams/ui'

export default function FlexExample() {
  return (
    <Flex justify="between" align="center" gap={4} wrap className="glass w-full max-w-lg rounded-lg p-4">
      <Flex align="center" gap={3}>
        <Avatar name="Carolina Reyes" />
        <div>
          <p className="font-medium">Carolina Reyes</p>
          <p className="text-xs text-fg-subtle">Rectora</p>
        </div>
      </Flex>
      <Button size="sm" variant="secondary">
        Ver perfil
      </Button>
    </Flex>
  )
}
