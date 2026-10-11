import { useState } from 'react'
import { toast, useHotkey } from '@ams/ui'

export default function HotkeyExample() {
  const [count, setCount] = useState(0)
  useHotkey('alt+n', () => {
    setCount((c) => c + 1)
    toast('Nueva tarea', { description: 'Abierta con Alt+N.' })
  })
  return (
    <p className="text-sm text-fg-muted">
      Pulsa <kbd className="rounded-xs border border-border px-1.5 font-mono text-xs text-fg">Alt</kbd> +{' '}
      <kbd className="rounded-xs border border-border px-1.5 font-mono text-xs text-fg">N</kbd>. Veces: <strong className="text-fg">{count}</strong>
    </p>
  )
}
