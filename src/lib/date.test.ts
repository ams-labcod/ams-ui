import { describe, expect, it } from 'vitest'
import { addMonths, clampDate, isSameDay, monthWeeks, startOfWeek, weekdayNames } from './date'

describe('date', () => {
  it('addMonths no desborda a fin de mes', () => {
    expect(isSameDay(addMonths(new Date(2026, 0, 31), 1), new Date(2026, 1, 28))).toBe(true)
    expect(isSameDay(addMonths(new Date(2024, 0, 31), 1), new Date(2024, 1, 29))).toBe(true)
    expect(isSameDay(addMonths(new Date(2026, 2, 15), -3), new Date(2025, 11, 15))).toBe(true)
  })

  it('startOfWeek empieza en lunes', () => {
    expect(isSameDay(startOfWeek(new Date(2026, 9, 11)), new Date(2026, 9, 5))) // domingo 11 oct → lunes 5
      .toBe(true)
    expect(isSameDay(startOfWeek(new Date(2026, 9, 5)), new Date(2026, 9, 5))).toBe(true)
  })

  it('monthWeeks cubre el mes completo en semanas de lunes a domingo', () => {
    const weeks = monthWeeks(new Date(2026, 1, 10)) // febrero 2026: empieza en domingo
    expect(weeks.every((w) => w.length === 7)).toBe(true)
    expect(weeks[0]?.[0]?.getDay()).toBe(1)
    expect(isSameDay(weeks[0]?.[6], new Date(2026, 1, 1))).toBe(true)
    const all = weeks.flat()
    expect(all.some((d) => isSameDay(d, new Date(2026, 1, 28)))).toBe(true)
    expect(weeks.length).toBe(5)
  })

  it('clampDate respeta los límites', () => {
    const min = new Date(2026, 0, 10)
    const max = new Date(2026, 0, 20)
    expect(isSameDay(clampDate(new Date(2026, 0, 1), min, max), min)).toBe(true)
    expect(isSameDay(clampDate(new Date(2026, 0, 25), min, max), max)).toBe(true)
  })

  it('weekdayNames empieza en lunes', () => {
    expect(weekdayNames('es', 'long')[0]).toBe('lunes')
  })
})
