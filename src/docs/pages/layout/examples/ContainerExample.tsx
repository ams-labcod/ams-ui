import { Container } from '@ams-labcod/ams-ui'

export default function ContainerExample() {
  return (
    <div className="flex w-full flex-col gap-3">
      {(['prose', 'narrow', 'page'] as const).map((size) => (
        <Container key={size} size={size} className="rounded-md border border-dashed border-accent-border bg-accent-soft py-3 text-center text-sm text-accent">
          size=&quot;{size}&quot;
        </Container>
      ))}
    </div>
  )
}
