import { useEffect, useState } from 'react'
import { Progress } from '@juanarenas312002/ams-ui'

export default function Bars() {
  const [sent, setSent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSent((n) => (n >= 312 ? 0 : n + 24)), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress label={`Boletines enviados: ${Math.min(sent, 312)} de 312`} value={Math.min(sent, 312)} max={312} showValue />
      <Progress label="Notas registradas del período" value={86} showValue tone="success" />
      <Progress label="Cupos ocupados en 6.º" value={97} showValue tone="warning" size="sm" />
      <Progress label="Importando estudiantes desde Excel…" value={null} />
    </div>
  )
}
