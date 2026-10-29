import { Component, Suspense, useEffect, useId, useState, type ReactNode } from 'react'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import {
  Aurora,
  Badge,
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Logo,
  Toaster,
  Tooltip,
  useHotkey,
  useTheme,
} from '@ams-labcod/ams-ui'
import { cn } from '../lib/cn'
import { DocHeader } from './kit'
import { categories, findEntry, normalize, registry, type DocEntry } from './registry'
import { href, useHashRoute } from './useHashRoute'

const HOME = 'introduccion'

export function DocsApp() {
  const slug = useHashRoute(HOME)
  const entry = findEntry(slug)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navId = useId()

  // Cambiar de página: cierra el menú móvil y vuelve arriba.
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
    document.title = entry ? `${entry.title} · AMS UI` : 'AMS UI'
  }, [slug, entry])

  // Ctrl/⌘+K o "/" abren el buscador; Escape cierra el menú móvil.
  useHotkey('mod+k', () => setSearchOpen((o) => !o))
  useHotkey('/', () => setSearchOpen(true))
  useHotkey('escape', () => setMenuOpen(false), { enabled: menuOpen, inInputs: true })

  function go(target: string) {
    setSearchOpen(false)
    window.location.hash = href(target)
  }

  return (
    <>
      <Aurora />
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-tooltip) focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
        Saltar al contenido
      </a>

      <header className="sticky top-3 z-(--z-sticky) mx-auto max-w-page px-4">
        <div className="glass-strong flex items-center gap-2 rounded-full py-2 pr-2 pl-3 md:gap-3 md:pl-5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls={navId}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <a href={href(HOME)} className="shrink-0 rounded-full" aria-label="AMS UI, inicio">
            <Logo size="sm" subtitle="UI" />
          </a>
          <Badge variant="accent" className="hidden sm:inline-flex">
            v0.3.1
          </Badge>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-keyshortcuts="Control+K"
            className="ml-auto flex h-control-sm w-full max-w-72 min-w-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-sunken px-3.5 text-sm text-fg-subtle transition-colors hover:border-border-strong hover:text-fg-muted"
          >
            <Search aria-hidden className="size-4 shrink-0" />
            <span className="truncate">Buscar</span>
            <kbd className="ml-auto hidden rounded-xs border border-border px-1.5 font-mono text-2xs sm:block">Ctrl K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)] gap-10 px-4 pt-8 md:grid-cols-[14rem_minmax(0,1fr)]">
        <nav
          id={navId}
          aria-label="Documentación"
          className={cn(
            'md:sticky md:top-24 md:block md:max-h-[calc(100dvh-7rem)] md:overflow-y-auto md:pb-10',
            menuOpen ? 'block' : 'hidden',
          )}
        >
          <Sidebar current={slug} />
        </nav>

        <main id="contenido" tabIndex={-1} className="min-w-0 pb-24 outline-none">
          <Suspense fallback={<p className="text-sm text-fg-subtle">Cargando…</p>}>
            <PageBoundary key={slug}>{entry ? <EntryPage entry={entry} /> : <NotFound slug={slug} />}</PageBoundary>
          </Suspense>
        </main>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} title="Buscar en la documentación">
        <CommandInput placeholder="Buscar componente, fundamento o patrón" />
        <CommandList>
          <CommandEmpty>Nada coincide. Prueba con el nombre en inglés, como «Button».</CommandEmpty>
          {categories.map((cat) => (
            <CommandGroup key={cat} heading={cat}>
              {registry
                .filter((e) => e.category === cat)
                .map((e) => (
                  <CommandItem key={e.slug} value={e.slug} keywords={[e.title, normalize(e.title), cat]} onSelect={() => go(e.slug)} shortcut={e.status === 'planned' ? e.since : undefined}>
                    {e.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
      <Toaster />
    </>
  )
}

function Sidebar({ current }: { current: string }) {
  return (
    <div className="flex flex-col gap-6">
      {categories.map((cat) => {
        const items = registry.filter((e) => e.category === cat)
        return (
          <div key={cat}>
            <h2 className="px-3 font-display text-sm font-semibold text-fg">{cat}</h2>
            <ul className="mt-1.5 flex flex-col gap-0.5">
              {items.map((e) => {
                const active = e.slug === current
                return (
                  <li key={e.slug}>
                    <a
                      href={href(e.slug)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-full border border-transparent px-3 py-1.5 text-sm transition-colors',
                        active
                          ? 'border-accent-border bg-accent-soft font-medium text-accent'
                          : e.status === 'planned'
                            ? 'text-fg-subtle hover:bg-hover hover:text-fg'
                            : 'text-fg-muted hover:bg-hover hover:text-fg',
                      )}
                    >
                      {e.title}
                      {e.status === 'planned' && <span className="text-2xs">{e.since}</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function EntryPage({ entry }: { entry: DocEntry }) {
  if (entry.page) {
    const Page = entry.page
    return <Page />
  }
  return (
    <DocHeader
      title={entry.title}
      status={entry.status}
      since={entry.since}
      description={`Este componente llega en ${entry.since}. Su página aparecerá aquí con vista previa, variantes, propiedades y ejemplos en cuanto se implemente.`}
    />
  )
}

function NotFound({ slug }: { slug: string }) {
  return (
    <DocHeader
      title="Página no encontrada"
      description={
        <>
          No existe ninguna página «{slug}». Usa el buscador o vuelve a la <a className="text-accent underline underline-offset-4" href={href(HOME)}>introducción</a>.
        </>
      }
    />
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'claro' : 'oscuro'
  return (
    <Tooltip content={`Tema ${next}`} side="bottom">
      <Button variant="secondary" size="icon-sm" onClick={toggleTheme} aria-label={`Cambiar a tema ${next}`}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  )
}

// Un error en una página no debe tumbar la documentación entera.
class PageBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <DocHeader
        title="Esta página no se pudo mostrar"
        description={<>Un ejemplo lanzó un error: «{this.state.error.message}». El resto de la documentación sigue funcionando; avísanos para corregirlo.</>}
      />
    )
  }
}
