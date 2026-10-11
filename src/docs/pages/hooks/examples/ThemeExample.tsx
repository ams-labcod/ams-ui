import { Moon, Sun } from 'lucide-react'
import { Button, useTheme } from '@ams/ui'

export default function ThemeExample() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex gap-2">
      <Button variant={theme === 'dark' ? 'outline' : 'ghost'} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>
        <Moon />
        Oscuro
      </Button>
      <Button variant={theme === 'light' ? 'outline' : 'ghost'} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>
        <Sun />
        Claro
      </Button>
    </div>
  )
}
