import { useId, useState, type DragEvent, type ReactNode } from 'react'
import { CircleCheck, CircleX, FileText, UploadCloud, X } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { formatBytes } from '../../../lib/format'
import { validateFiles, type FileRules, type RejectedFile } from './validateFiles'

export interface DropzoneProps extends FileRules {
  /** Recibe los archivos válidos y los rechazados con su motivo. */
  onFiles: (accepted: File[], rejected: RejectedFile[]) => void
  multiple?: boolean
  disabled?: boolean
  /** Explica qué se admite: «PDF o imagen, hasta 5 MB». Se lee al enfocar. */
  hint?: ReactNode
  /** Nombre accesible del selector de archivos. */
  label?: string
  className?: string
}

export function Dropzone({ onFiles, accept, maxSize, maxFiles, multiple = false, disabled = false, hint, label = 'Subir archivos', className }: DropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const hintId = useId()

  function handle(list: FileList | null) {
    if (!list || disabled) return
    const files = multiple ? Array.from(list) : Array.from(list).slice(0, 1)
    const { accepted, rejected } = validateFiles(files, { accept, maxSize, maxFiles })
    onFiles(accepted, rejected)
  }

  function onDrag(e: DragEvent, over: boolean) {
    e.preventDefault()
    if (!disabled) setDragging(over)
  }

  return (
    <label
      onDragEnter={(e) => onDrag(e, true)}
      onDragOver={(e) => onDrag(e, true)}
      onDragLeave={(e) => {
        // Ignora el dragleave que se dispara al pasar sobre un hijo.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onDrag(e, false)
      }}
      onDrop={(e) => {
        onDrag(e, false)
        handle(e.dataTransfer.files)
      }}
      data-dragging={dragging || undefined}
      className={cn(
        'flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-border-strong bg-glass px-6 py-10 text-center transition-colors duration-(--duration-fast)',
        'hover:border-accent-border has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring',
        'data-dragging:border-accent data-dragging:bg-accent-soft',
        disabled && 'state-disabled',
        className,
      )}
    >
      <input
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        aria-describedby={hint ? hintId : undefined}
        onChange={(e) => {
          handle(e.target.files)
          e.target.value = '' // permite volver a elegir el mismo archivo
        }}
      />
      <span
        aria-hidden
        className="mb-4 flex size-13 items-center justify-center rounded-[14px] border border-accent-border bg-[linear-gradient(135deg,rgb(77_182_172/0.25),rgb(77_182_172/0.05))] text-accent"
      >
        <UploadCloud className="size-5.5" />
      </span>
      <span className="text-sm text-fg">
        {dragging ? 'Suelta para subir' : <>Arrastra {multiple ? 'archivos' : 'un archivo'} aquí o <span className="font-medium text-accent underline underline-offset-4">búscalo en tu equipo</span></>}
      </span>
      {hint && (
        <span id={hintId} className="mt-1 text-xs text-fg-subtle">
          {hint}
        </span>
      )}
    </label>
  )
}

export interface DropzoneFileProps {
  name: string
  size: number
  status: 'uploading' | 'done' | 'error'
  /** 0–100, mientras sube. */
  progress?: number
  error?: ReactNode
  onRemove?: () => void
}

/** Fila de un archivo subido o en curso. */
export function DropzoneFile({ name, size, status, progress = 0, error, onRemove }: DropzoneFileProps) {
  return (
    <li className={cn('flex items-center gap-3 rounded-md border bg-sunken px-3.5 py-3 text-sm', status === 'error' ? 'border-danger-border' : 'border-border')}>
      <FileText aria-hidden className="size-5 shrink-0 text-fg-subtle" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="truncate text-fg">{name}</span>
          <span className="shrink-0 text-xs text-fg-subtle tabular-nums">{formatBytes(size)}</span>
        </div>
        {status === 'uploading' && (
          <div role="progressbar" aria-label={`Subiendo ${name}`} aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-1 overflow-hidden rounded-full bg-hover">
            <div className="h-full rounded-full bg-gradient-primary transition-[width] duration-(--duration-base)" style={{ width: `${progress}%` }} />
          </div>
        )}
        {status === 'error' && error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
      {status === 'done' && <CircleCheck aria-label="Subido" className="size-4.5 shrink-0 text-success" />}
      {status === 'error' && <CircleX aria-label="Error" className="size-4.5 shrink-0 text-danger" />}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Quitar ${name}`}
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-hover hover:text-fg"
        >
          <X className="size-4" />
        </button>
      )}
    </li>
  )
}
