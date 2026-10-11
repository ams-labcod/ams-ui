// Auditoría de accesibilidad: axe-core (WCAG 2.0–2.2 A/AA) sobre cada página de
// la documentación, en tema oscuro y claro, con el Chrome instalado en el equipo.
// Uso: npm run build && npm run a11y   (CHROME_PATH para otra ruta de Chrome)
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { preview } from 'vite'
import puppeteer from 'puppeteer-core'

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
const chrome =
  process.env.CHROME_PATH ??
  (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome')

const server = await preview({ preview: { port: 4318, strictPort: true } })
const base = 'http://localhost:4318/'
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, defaultViewport: { width: 1280, height: 900 } })

const results = []
try {
  const page = await browser.newPage()
  await page.goto(base, { waitUntil: 'networkidle0' })
  const slugs = await page.$$eval('nav[aria-label="Documentación"] a[href^="#/"]', (as) => as.map((a) => a.getAttribute('href').slice(2)))

  for (const theme of ['dark', 'light']) {
    for (const slug of slugs) {
      const p = await browser.newPage()
      const errors = []
      p.on('pageerror', (e) => errors.push(e.message))
      await p.evaluateOnNewDocument((t) => localStorage.setItem('ams-theme', t), theme)
      await p.goto(`${base}#/${slug}`, { waitUntil: 'networkidle0' })
      try {
        await p.waitForSelector('main h1', { timeout: 8000 })
      } catch {
        // Una página que no renderiza es un fallo, no una infracción: se informa y se sigue.
        results.push({ theme, slug, id: 'render-error', impact: 'critical', help: 'La página no se renderiza', nodes: errors.length ? errors : ['sin <h1> en main'] })
        await p.close()
        continue
      }
      await new Promise((r) => setTimeout(r, 400)) // efectos y animaciones de entrada
      await p.addScriptTag({ content: axeSource })
      const { violations } = await p.evaluate(() =>
        // eslint-disable-next-line no-undef
        axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }),
      )
      for (const v of violations) results.push({ theme, slug, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => n.target.join(' ')) })
      await p.close()
    }
  }
  console.log(`Páginas auditadas: ${slugs.length} × 2 temas`)
} finally {
  await browser.close()
  await new Promise((r) => server.httpServer.close(r))
}

if (results.length === 0) {
  console.log('Sin infracciones WCAG A/AA.')
} else {
  const byRule = Object.groupBy(results, (r) => r.id)
  for (const [id, list] of Object.entries(byRule)) {
    console.log(`\n✗ ${id} (${list[0].impact}) — ${list[0].help}`)
    for (const r of list.slice(0, 8)) console.log(`   ${r.theme.padEnd(5)} #/${r.slug}: ${r.nodes.slice(0, 3).join(' | ')}${r.nodes.length > 3 ? ` (+${r.nodes.length - 3})` : ''}`)
    if (list.length > 8) console.log(`   … y ${list.length - 8} páginas más`)
  }
  process.exitCode = 1
}
