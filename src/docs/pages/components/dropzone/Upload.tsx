import { useEffect, useState } from 'react'
import { Dropzone, DropzoneFile, type DropzoneFileProps } from '@ams/ui'

type Item = Omit<DropzoneFileProps, 'onRemove'> & { id: number }
let nextId = 0

export default function Upload() {
  const [items, setItems] = useState<Item[]>([])

  // Simula la subida: avanza el progreso de los archivos en curso.
  useEffect(() => {
    if (!items.some((i) => i.status === 'uploading')) return
    const timer = setInterval(() => {
      setItems((cur) =>
        cur.map((i) => {
          if (i.status !== 'uploading') return i
          const progress = Math.min(100, (i.progress ?? 0) + 20)
          return { ...i, progress, status: progress === 100 ? 'done' : 'uploading' }
        }),
      )
    }, 300)
    return () => clearInterval(timer)
  }, [items])

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Dropzone
        multiple
        accept=".pdf,image/*"
        maxSize={5_000_000}
        hint="PDF o imagen, hasta 5 MB cada uno."
        label="Subir documentos de matrícula"
        onFiles={(accepted, rejected) =>
          setItems((cur) => [
            ...cur,
            ...accepted.map((f): Item => ({ id: nextId++, name: f.name, size: f.size, status: 'uploading', progress: 0 })),
            ...rejected.map((r): Item => ({ id: nextId++, name: r.file.name, size: r.file.size, status: 'error', error: r.reason })),
          ])
        }
      />
      {items.length > 0 && (
        <ul aria-label="Documentos" className="flex flex-col gap-2">
          {items.map((i) => (
            <DropzoneFile key={i.id} {...i} onRemove={() => setItems((cur) => cur.filter((x) => x.id !== i.id))} />
          ))}
        </ul>
      )}
    </div>
  )
}
