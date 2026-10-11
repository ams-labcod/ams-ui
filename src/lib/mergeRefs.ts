import type { Ref, RefCallback } from 'react'

/** Une varios refs en uno: útil cuando el componente necesita el nodo y el consumidor también. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }
  }
}
