import { Avatar } from '@juanarenas312002/ams-ui'

const teachers = ['Carolina Reyes', 'Javier Molina', 'Patricia Delgado', 'Diego Quintero']

export default function Group() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {teachers.map((t) => (
          <Avatar key={t} name={t} size="sm" className="ring-2 ring-bg" />
        ))}
      </div>
      <span className="text-sm text-fg-muted">4 docentes en 3.º A</span>
    </div>
  )
}
