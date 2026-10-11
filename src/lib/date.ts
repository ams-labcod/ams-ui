// Utilidades de fecha mínimas para Calendar y DatePicker. Trabajan con fechas
// locales a medianoche; las horas se ignoran.

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

/** Suma meses sin desbordar: 31 ene + 1 mes = 28/29 feb, no 3 mar. */
export function addMonths(d: Date, n: number) {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), lastDay))
}

export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

/** Lunes de la semana de d (la semana empieza en lunes, como en la referencia). */
export function startOfWeek(d: Date) {
  return addDays(d, -((d.getDay() + 6) % 7))
}

/** Semanas visibles de un mes: de lunes a domingo, completando con días de los meses vecinos. */
export function monthWeeks(month: Date): Date[][] {
  const first = startOfMonth(month)
  const start = startOfWeek(first)
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0)
  const weeks: Date[][] = []
  for (let day = start; day <= last || weeks.length === 0; ) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(day, i))
    weeks.push(week)
    day = addDays(day, 7)
  }
  return weeks
}

export function clampDate(d: Date, min?: Date, max?: Date) {
  if (min && d < startOfDay(min)) return startOfDay(min)
  if (max && d > startOfDay(max)) return startOfDay(max)
  return d
}

/** Nombres cortos de los días, de lunes a domingo, en el idioma dado. */
export function weekdayNames(locale: string, format: 'narrow' | 'short' | 'long' = 'short') {
  const monday = new Date(2024, 0, 1) // 1 ene 2024 fue lunes
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i).toLocaleDateString(locale, { weekday: format }))
}
