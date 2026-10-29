import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Avatar } from '@ams-labcod/ams-ui'

const teachers = ['Carolina Reyes', 'Javier Molina', 'Patricia Delgado', 'Diego Quintero', 'Camila Ruiz']

export default function Inline() {
  return (
    <Command className="w-full max-w-sm" label="Buscar docente">
      <CommandInput placeholder="Buscar docente" />
      <CommandList className="max-h-56">
        <CommandEmpty>Ningún docente con ese nombre.</CommandEmpty>
        <CommandGroup heading="Docentes de 3.º A">
          {teachers.map((t) => (
            <CommandItem key={t} icon={<Avatar name={t} size="sm" className="size-6 text-[10px]" aria-hidden />}>
              {t}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
