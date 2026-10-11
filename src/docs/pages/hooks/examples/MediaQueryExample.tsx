import { Badge, useMediaQuery } from '@ams/ui'

export default function MediaQueryExample() {
  const desktop = useMediaQuery('(min-width: 55rem)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant={desktop ? 'accent' : 'neutral'}>{desktop ? 'Pantalla ancha (≥ 880 px)' : 'Pantalla estrecha'}</Badge>
      <Badge variant={reducedMotion ? 'warning' : 'neutral'}>{reducedMotion ? 'Movimiento reducido' : 'Animaciones activas'}</Badge>
    </div>
  )
}
