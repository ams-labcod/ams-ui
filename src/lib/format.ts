// Formateo con Intl: separadores y unidades según el idioma (por defecto español).

const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const

/** 1536 → "1,5 kB". Base 1000, como los muestran los sistemas operativos actuales. */
export function formatBytes(bytes: number, locale = 'es') {
  let value = bytes
  let i = 0
  while (value >= 1000 && i < UNITS.length - 1) {
    value /= 1000
    i++
  }
  return new Intl.NumberFormat(locale, { style: 'unit', unit: UNITS[i], unitDisplay: 'short', maximumFractionDigits: i === 0 ? 0 : 1 }).format(value)
}

/** 1250000 → "1.250.000". */
export function formatNumber(value: number, locale = 'es', options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value)
}

/** Moneda; por defecto pesos colombianos sin decimales, como en la referencia ("$ 1.250.000"). */
export function formatCurrency(value: number, currency = 'COP', locale = 'es-CO') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: currency === 'COP' ? 0 : 2 }).format(value)
}

export function formatDate(date: Date, locale = 'es', options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return date.toLocaleDateString(locale, options)
}
