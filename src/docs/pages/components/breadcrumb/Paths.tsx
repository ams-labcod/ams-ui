import { Breadcrumb } from '@ams-labcod/ams-ui'

export default function Paths() {
  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb
        items={[
          { label: 'Panel', href: '#/breadcrumb' },
          { label: 'Cursos', href: '#/breadcrumb' },
          { label: '3.º A' },
        ]}
      />
      {/* Con más de 4 niveles, los intermedios se agrupan en «…». */}
      <Breadcrumb
        items={[
          { label: 'Panel', href: '#/breadcrumb' },
          { label: 'Sede Norte', href: '#/breadcrumb' },
          { label: 'Bachillerato', href: '#/breadcrumb' },
          { label: '3.º A', href: '#/breadcrumb' },
          { label: 'Matemáticas', href: '#/breadcrumb' },
          { label: 'Notas del período 2' },
        ]}
      />
    </div>
  )
}
