import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Ellipsis, Pencil, Search, Trash2, UserPlus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  Avatar,
  Badge,
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormItem,
  Input,
  Select,
  SheetClose,
  Sheet,
  SheetContent,
  Switch,
  toast,
  useDataTable,
  type ColumnDef,
} from '@ams/ui'

type Role = 'admin' | 'docente' | 'secretaria'
interface User {
  id: string
  name: string
  email: string
  role: Role
  active: boolean
}

const roleLabels: Record<Role, string> = { admin: 'Administración', docente: 'Docente', secretaria: 'Secretaría' }
const roleVariant = { admin: 'accent', docente: 'info', secretaria: 'neutral' } as const

const initialUsers: User[] = [
  { id: 'u1', name: 'Carolina Reyes', email: 'carolina.reyes@sanandres.edu.co', role: 'admin', active: true },
  { id: 'u2', name: 'Javier Molina', email: 'javier.molina@sanandres.edu.co', role: 'docente', active: true },
  { id: 'u3', name: 'Patricia Delgado', email: 'patricia.delgado@sanandres.edu.co', role: 'docente', active: true },
  { id: 'u4', name: 'Diego Quintero', email: 'diego.quintero@sanandres.edu.co', role: 'secretaria', active: false },
  { id: 'u5', name: 'Camila Ruiz', email: 'camila.ruiz@sanandres.edu.co', role: 'docente', active: true },
  { id: 'u6', name: 'Mateo Cárdenas', email: 'mateo.cardenas@sanandres.edu.co', role: 'docente', active: true },
]

function setActiveToast(u: User, active: boolean) {
  toast.success(active ? `${u.name} puede ingresar` : `${u.name} ya no puede ingresar`)
}

const schema = z.object({
  name: z.string().trim().min(3, 'Escribe el nombre completo.'),
  email: z.string().email('Escribe un correo válido, por ejemplo nombre@sanandres.edu.co.'),
  role: z.enum(['admin', 'docente', 'secretaria'], { error: 'Elige un rol.' }),
})
type UserForm = z.infer<typeof schema>

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<User | 'new' | null>(null)
  const [toDelete, setToDelete] = useState<User | null>(null)

  // Memorizadas: setUsers con función no necesita dependencias.
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Usuario',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.original.name} size="sm" aria-hidden />
          <div className="min-w-0">
            <p className="truncate font-medium text-fg">{row.original.name}</p>
            <p className="truncate text-xs text-fg-subtle">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: 'email', header: 'Correo', enableHiding: true },
    { accessorKey: 'role', header: 'Rol', cell: ({ getValue }) => <Badge variant={roleVariant[getValue<Role>()]}>{roleLabels[getValue<Role>()]}</Badge> },
    {
      accessorKey: 'active',
      header: 'Acceso',
      cell: ({ row }) => <Switch aria-label={`Acceso de ${row.original.name}`} checked={row.original.active} onChange={(e) => {
            const active = e.target.checked
            setUsers((all) => all.map((x) => (x.id === row.original.id ? { ...x, active } : x)))
            setActiveToast(row.original, active)
          }} />,
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Acciones</span>,
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Acciones para ${row.original.name}`}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem icon={<Pencil />} onSelect={() => setEditing(row.original)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} destructive onSelect={() => setToDelete(row.original)}>
              Eliminar usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [])

  const table = useDataTable({
    data: users,
    columns,
    getRowId: (u) => u.id,
    getRowLabel: (u) => u.name,
    selectable: true,
    globalFilter: search,
    pageSize: 5,
    // El correo ya se ve bajo el nombre: columna oculta por defecto, disponible en «Columnas».
    initialColumnVisibility: { email: false },
  })

  function save(values: UserForm) {
    if (editing === 'new') {
      setUsers((all) => [...all, { id: crypto.randomUUID(), active: true, ...values }])
      toast.success('Usuario creado', { description: `Enviamos la invitación a ${values.email}.` })
    } else if (editing) {
      setUsers((all) => all.map((u) => (u.id === editing.id ? { ...u, ...values } : u)))
      toast.success('Cambios guardados')
    }
    setEditing(null)
  }

  return (
    <>
      <DataTable
        table={table}
        label="Usuarios"
        toolbar={
          <>
            <Input type="search" aria-label="Buscar usuario" placeholder="Buscar por nombre o correo" startIcon={<Search />} value={search} onChange={(e) => setSearch(e.target.value)} className="h-control-sm w-60 rounded-full" />
            <Button size="sm" onClick={() => setEditing('new')}>
              <UserPlus />
              Nuevo usuario
            </Button>
          </>
        }
        bulkActions={(rows, clear) => (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setUsers((all) => all.map((u) => (rows.some((r) => r.id === u.id) ? { ...u, active: false } : u)))
              toast.success(`Acceso retirado a ${rows.length} usuarios`)
              clear()
            }}
          >
            Retirar acceso
          </Button>
        )}
      />

      <Sheet open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        {editing && <UserSheet user={editing === 'new' ? null : editing} onSave={save} />}
      </Sheet>

      <AlertDialog open={toDelete !== null} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent title={`¿Eliminar a ${toDelete?.name}?`} description="Perderá el acceso de inmediato y sus registros quedarán a nombre de «Usuario eliminado». No se puede deshacer.">
          <AlertDialogCancel />
          <AlertDialogAction
            onClick={() => {
              setUsers((all) => all.filter((u) => u.id !== toDelete?.id))
              toast.success('Usuario eliminado')
            }}
          >
            Eliminar usuario
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function UserSheet({ user, onSave }: { user: User | null; onSave: (v: UserForm) => void }) {
  const form = useForm<UserForm>({ resolver: zodResolver(schema), defaultValues: user ?? { name: '', email: '' } })
  return (
    <SheetContent
      title={user ? `Editar a ${user.name}` : 'Nuevo usuario'}
      description={user ? 'Los cambios se aplican al guardar.' : 'Le enviaremos una invitación para crear su contraseña.'}
      footer={
        <>
          <SheetClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </SheetClose>
          <Button type="submit" form="user-form" loading={form.formState.isSubmitting}>
            {user ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
        </>
      }
    >
      <Form id="user-form" form={form} onSubmit={onSave} className="grid gap-5">
        <FormItem<UserForm, 'name'> name="name" label="Nombre completo" required>
          {(f) => <Input {...f} autoComplete="name" />}
        </FormItem>
        <FormItem<UserForm, 'email'> name="email" label="Correo institucional" required>
          {(f) => <Input {...f} type="email" autoComplete="email" />}
        </FormItem>
        <FormItem<UserForm, 'role'> name="role" label="Rol" description="Define qué módulos puede ver." required>
          {(f) => <Select value={f.value ?? ''} onValueChange={f.onChange} options={Object.entries(roleLabels).map(([value, label]) => ({ value, label }))} />}
        </FormItem>
      </Form>
    </SheetContent>
  )
}
