import { useId, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from 'react'
import { Bold, Code, Heading2, Italic, Link, List, Quote } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Button } from '../button/Button'
import { controlClass, useFieldControl } from '../field/Field'
import { Tooltip } from '../tooltip/Tooltip'
import { applyMarkdown, type MarkdownFormat } from './markdown'

const tools: { format: MarkdownFormat; label: string; icon: ReactNode; shortcut?: string }[] = [
  { format: 'heading', label: 'Título', icon: <Heading2 /> },
  { format: 'bold', label: 'Negrita', icon: <Bold />, shortcut: 'Ctrl+B' },
  { format: 'italic', label: 'Cursiva', icon: <Italic />, shortcut: 'Ctrl+I' },
  { format: 'list', label: 'Lista', icon: <List /> },
  { format: 'quote', label: 'Cita', icon: <Quote /> },
  { format: 'code', label: 'Código', icon: <Code /> },
  { format: 'link', label: 'Enlace', icon: <Link />, shortcut: 'Ctrl+K' },
]

const shortcuts: Record<string, MarkdownFormat> = { b: 'bold', i: 'italic', k: 'link' }

export interface EditorProps extends Omit<ComponentProps<'textarea'>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

/** Textarea con barra de formato que escribe Markdown. No renderiza la vista previa. */
export function Editor({ value, defaultValue = '', onChange, className, rows = 8, ...props }: EditorProps) {
  const [inner, setInner] = useState(defaultValue)
  const text = value ?? inner
  const ref = useRef<HTMLTextAreaElement>(null)
  const [active, setActive] = useState(0)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const control = useFieldControl(props)
  const autoId = useId()
  const textareaId = control.id ?? autoId

  function update(next: string) {
    setInner(next)
    onChange?.(next)
  }

  function format(kind: MarkdownFormat) {
    const el = ref.current
    if (!el) return
    const result = applyMarkdown(text, el.selectionStart, el.selectionEnd, kind)
    update(result.value)
    // Restaura la selección cuando React ya pintó el nuevo valor.
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(result.start, result.end)
    })
  }

  function onTextareaKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    const kind = (e.ctrlKey || e.metaKey) && shortcuts[e.key.toLowerCase()]
    if (kind) {
      e.preventDefault()
      format(kind)
    }
  }

  // Barra de herramientas WAI-ARIA: un solo botón en el orden de tabulación, flechas para moverse.
  function onToolbarKey(e: KeyboardEvent) {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    const jump = e.key === 'Home' ? 0 : e.key === 'End' ? tools.length - 1 : null
    if (!delta && jump === null) return
    e.preventDefault()
    const next = jump ?? (active + delta + tools.length) % tools.length
    setActive(next)
    toolbarRef.current?.querySelectorAll('button')[next]?.focus()
  }

  return (
    <div className={cn('overflow-hidden rounded-md border border-border bg-sunken transition-colors focus-within:border-accent-border', control['aria-invalid'] && 'border-danger-border', className)}>
      <div ref={toolbarRef} role="toolbar" aria-label="Formato" aria-controls={textareaId} onKeyDown={onToolbarKey} className="flex flex-wrap gap-0.5 border-b border-border p-1.5">
        {tools.map((t, i) => (
          <Tooltip key={t.format} content={t.shortcut ? `${t.label} (${t.shortcut})` : t.label}>
            <Button
              variant="ghost"
              size="icon-sm"
              tabIndex={i === active ? 0 : -1}
              aria-label={t.label}
              aria-keyshortcuts={t.shortcut?.replace('Ctrl', 'Control')}
              disabled={control.disabled}
              onClick={() => {
                setActive(i)
                format(t.format)
              }}
              className="rounded-sm"
            >
              {t.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
      <textarea
        ref={ref}
        rows={rows}
        {...control}
        id={textareaId}
        value={text}
        onChange={(e) => update(e.target.value)}
        onKeyDown={onTextareaKey}
        className={cn(controlClass, 'block min-h-32 resize-y rounded-none border-0 bg-transparent py-3 font-mono text-[13px] leading-relaxed focus-visible:outline-none')}
      />
    </div>
  )
}
