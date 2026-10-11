import { useState, type AriaAttributes, type ReactNode } from 'react'
import { Popover as P } from 'radix-ui'
import { Command as C } from 'cmdk'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { controlClass, useFieldControl } from '../field/Field'

export interface ComboboxOption {
  value: string
  label: string
  /** Texto secundario, también buscable (código, curso…). */
  description?: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | null
  defaultValue?: string | null
  /** null si se deselecciona eligiendo de nuevo la opción actual. */
  onValueChange?: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  /** Mensaje cuando la búsqueda no encuentra nada. */
  emptyMessage?: ReactNode
  /** Muestra un spinner en la lista (p. ej. mientras se buscan resultados en el servidor). */
  loading?: boolean
  /** Para buscar en el servidor: recibe el texto y desactiva el filtro local. */
  onSearch?: (query: string) => void
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: AriaAttributes['aria-invalid']
}

export function Combobox({
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = 'Selecciona una opción',
  searchPlaceholder = 'Buscar',
  emptyMessage = 'Ningún resultado.',
  loading = false,
  onSearch,
  name,
  className,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState<string | null>(defaultValue)
  const selected = value !== undefined ? value : inner
  const control = useFieldControl(props)
  const current = options.find((o) => o.value === selected)

  function choose(next: string) {
    const v = next === selected ? null : next
    setInner(v)
    onValueChange?.(v)
    setOpen(false)
  }

  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger
        role="combobox"
        aria-expanded={open}
        id={control.id}
        disabled={control.disabled}
        aria-label={control['aria-label']}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        aria-required={control.required}
        className={cn(controlClass, 'inline-flex h-control-md cursor-pointer items-center justify-between gap-2 text-left', !current && 'text-fg-subtle', className)}
      >
        <span className="truncate">{current?.label ?? placeholder}</span>
        <ChevronsUpDown aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      </P.Trigger>
      {name && <input type="hidden" name={name} value={selected ?? ''} />}
      <P.Portal>
        <P.Content
          align="start"
          sideOffset={6}
          className="z-(--z-popover) w-(--radix-popover-trigger-width) min-w-60 overflow-hidden rounded-md border border-border bg-surface text-fg shadow-pop outline-none animate-overlay-in"
        >
          <C shouldFilter={!onSearch} loop label={control['aria-label'] ?? placeholder}>
            <div className="flex items-center gap-2.5 border-b border-border px-3">
              <Search aria-hidden className="size-4 shrink-0 text-fg-subtle" />
              <C.Input placeholder={searchPlaceholder} onValueChange={onSearch} className="h-control-sm w-full bg-transparent text-sm outline-none placeholder:text-fg-subtle" />
            </div>
            <C.List className="max-h-64 overflow-y-auto overscroll-contain p-1">
              {loading ? (
                <C.Loading>
                  <p className="px-3 py-6 text-center text-sm text-fg-muted">Buscando…</p>
                </C.Loading>
              ) : (
                <C.Empty className="px-3 py-6 text-center text-sm text-fg-muted">{emptyMessage}</C.Empty>
              )}
              {!loading &&
                options.map((o) => (
                  <C.Item
                    key={o.value}
                    value={o.value}
                    keywords={[o.label, o.description ?? '']}
                    disabled={o.disabled}
                    onSelect={choose}
                    className="relative flex cursor-pointer items-center gap-2.5 rounded-sm py-2 pr-8 pl-2.5 text-sm text-fg-muted outline-none select-none data-[disabled=true]:state-disabled data-[selected=true]:bg-hover data-[selected=true]:text-fg"
                  >
                    <span className="min-w-0">
                      <span className="block truncate">{o.label}</span>
                      {o.description && <span className="block truncate text-xs text-fg-subtle">{o.description}</span>}
                    </span>
                    {o.value === selected && <Check aria-hidden className="absolute right-2.5 size-4 text-accent" />}
                  </C.Item>
                ))}
            </C.List>
          </C>
        </P.Content>
      </P.Portal>
    </P.Root>
  )
}
