import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge debe conocer las escalas propias para no descartar
// clases como `text-h2` creyendo que chocan con `text-fg`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['2xs', 'lead', 'h3', 'h2', 'h1', 'display', 'stat'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
