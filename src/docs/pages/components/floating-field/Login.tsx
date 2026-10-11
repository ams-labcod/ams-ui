import { useState, type FormEvent } from 'react'
import { Button, FloatingField } from '@ams/ui'

export default function Login() {
  const [error, setError] = useState<string>()

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email'))
    setError(email.includes('@') ? undefined : 'Escribe el correo institucional, por ejemplo ana.perez@colegio.edu.co.')
  }

  return (
    <form noValidate onSubmit={submit} className="glass grid w-full max-w-sm gap-4 rounded-xl p-6">
      <p className="font-display text-h3 font-semibold">Ingresar al sistema</p>
      <FloatingField name="email" type="email" label="Correo institucional" autoComplete="username" required error={error} />
      <FloatingField name="password" type="password" label="Contraseña" autoComplete="current-password" required description="Mínimo 8 caracteres." />
      <Button type="submit" size="lg" className="mt-2">
        Ingresar
      </Button>
    </form>
  )
}
