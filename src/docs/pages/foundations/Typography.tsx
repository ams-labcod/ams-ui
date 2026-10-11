import { CodeBlock, DocHeader, DocSection, SpecTable } from '../../kit'

const roles = [
  { role: 'Display', cls: 'font-display text-display font-semibold', spec: 'Space Grotesk 600 · 40–68 px · 1,02 · −0,025em', sample: 'La gestión académica, simple y conectada.' },
  { role: 'Título 1', cls: 'font-display text-h1 font-semibold', spec: 'Space Grotesk 600 · 32–48 px · 1,1 · −0,02em', sample: 'Calificaciones del período' },
  { role: 'Título 2', cls: 'font-display text-h2 font-semibold', spec: 'Space Grotesk 600 · 24 px · 1,2 · −0,015em', sample: 'Boletines automáticos' },
  { role: 'Título 3', cls: 'font-display text-h3 font-semibold', spec: 'Space Grotesk 600 · 19 px · 1,3 · −0,01em', sample: 'Matrícula en línea' },
  { role: 'Entradilla', cls: 'text-lead text-fg-muted', spec: 'Inter 400 · 17 px · 1,55', sample: 'Cada módulo se conecta con los demás para mantener tus datos coherentes.' },
  { role: 'Cuerpo', cls: 'text-sm leading-relaxed text-fg-muted', spec: 'Inter 400 · 14 px · 1,6', sample: 'Registra asistencia desde la app o el panel web. Las inasistencias avisan al acudiente automáticamente.' },
  { role: 'Etiqueta', cls: 'text-sm font-medium', spec: 'Inter 500 · 14 px', sample: 'Correo del acudiente' },
  { role: 'Botón', cls: 'text-sm font-semibold', spec: 'Inter 600 · 14 px (15 px en grande)', sample: 'Guardar calificaciones' },
  { role: 'Leyenda', cls: 'text-xs text-fg-subtle', spec: 'Inter 400 · 12 px', sample: 'Actualizado hace 5 minutos' },
  { role: 'Cifra', cls: 'font-display text-stat font-semibold', spec: 'Space Grotesk 600 · 36–52 px · 1 · −0,02em', sample: '94,6 %' },
  { role: 'Código', cls: 'font-mono text-[13px]', spec: 'Monoespaciada del sistema · 13 px', sample: "<Button variant=\"primary\">" },
]

export default function Typography() {
  return (
    <>
      <DocHeader
        title="Tipografía"
        status="stable"
        since="v0.1"
        description="Dos familias con trabajos distintos: Space Grotesk, geométrica y algo técnica, para títulos y cifras; Inter, neutra y muy legible en tamaños pequeños, para todo lo demás."
      />

      <DocSection title="Familias">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass rounded-lg p-6">
            <p className="font-display text-[56px] leading-none font-semibold tracking-[-0.02em]">Aa</p>
            <p className="mt-4 font-display text-h3 font-semibold">Space Grotesk</p>
            <p className="mt-1 text-sm text-fg-muted">Títulos, cifras, nombres de módulo. Pesos 500 y 600.</p>
            <code className="mt-3 block font-mono text-xs text-fg-subtle">font-display</code>
          </div>
          <div className="glass rounded-lg p-6">
            <p className="text-[56px] leading-none font-medium tracking-[-0.02em]">Aa</p>
            <p className="mt-4 text-h3 font-semibold">Inter</p>
            <p className="mt-1 text-sm text-fg-muted">Texto, etiquetas, botones y tablas. Pesos 400, 500 y 600.</p>
            <code className="mt-3 block font-mono text-xs text-fg-subtle">font-sans (por defecto)</code>
          </div>
        </div>
      </DocSection>

      <DocSection title="Escala" description="Los títulos grandes son fluidos: crecen con el ancho de la ventana entre un mínimo y un máximo.">
        <div className="divide-y divide-border rounded-lg border border-border">
          {roles.map((r) => (
            <div key={r.role} className="grid gap-2 p-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6">
              <div>
                <p className="text-sm font-medium text-fg">{r.role}</p>
                <p className="mt-0.5 text-xs text-fg-subtle">{r.spec}</p>
              </div>
              <p className={`${r.cls} min-w-0 text-balance break-words`}>{r.sample}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Acento de marca"
        description="La referencia destaca una frase del título con un degradado turquesa en cursiva. Es la firma de la marca: úsala como mucho una vez por vista y solo en títulos de Display o Título 1."
      >
        <div className="glass rounded-lg p-8">
          <p className="font-display text-h1 font-semibold">
            Una plataforma. <span className="text-gradient font-medium italic">Cinco módulos esenciales.</span>
          </p>
        </div>
        <CodeBlock code={`<h2 className="font-display text-h1 font-semibold">
  Una plataforma. <span className="text-gradient font-medium italic">Cinco módulos esenciales.</span>
</h2>`} />
      </DocSection>

      <DocSection title="Reglas">
        <SpecTable
          head={['Regla', 'Por qué']}
          rows={[
            ['Párrafos de 45 a 75 caracteres (max-w-prose)', 'Las líneas más largas cansan la lectura.'],
            ['text-balance en títulos, text-pretty en párrafos', 'Evita palabras sueltas al final de un bloque.'],
            ['Las mayúsculas se reservan para subtítulos breves de marca', 'Así lo hace la referencia («Academic Manager», cifras); en etiquetas de formulario no se usan.'],
            ['Cifras con Space Grotesk', 'Distingue los datos del texto que los rodea.'],
          ]}
        />
      </DocSection>
    </>
  )
}
