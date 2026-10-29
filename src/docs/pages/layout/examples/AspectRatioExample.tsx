import { AspectRatio, Grid } from '@ams-labcod/ams-ui'

export default function AspectRatioExample() {
  return (
    <Grid columns={{ base: 1, sm: 2 }} gap={4} className="w-full max-w-xl">
      <AspectRatio ratio={16 / 9} className="glass flex items-center justify-center rounded-lg">
        <span className="text-sm text-fg-muted">16 : 9 · vídeo de bienvenida</span>
      </AspectRatio>
      <AspectRatio ratio={1} className="rounded-lg bg-[linear-gradient(135deg,var(--ams-chart-1),var(--ams-chart-3))]">
        <span className="absolute bottom-3 left-3 text-sm font-medium text-white">1 : 1 · foto de perfil</span>
      </AspectRatio>
    </Grid>
  )
}
