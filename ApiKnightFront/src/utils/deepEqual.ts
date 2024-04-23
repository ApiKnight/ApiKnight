import { Obj } from '@/types/base'

function deepEqual<T extends object>(p: Obj<T>, q: Obj<T>): boolean {
  if (p === q) {
    return true
  }
  const pNames = Object.getOwnPropertyNames(p)
  const qNames = Object.getOwnPropertyNames(q)

  if (pNames.length !== qNames.length) {
    return false
  }

  for (let i = 0; i < pNames.length; i++) {
    const propName = pNames[i]
    if (p[propName] instanceof Object && q[propName] instanceof Object) {
      if (!deepEqual(p[propName], q[propName])) {
        return false
      }
    } else {
      if (p[propName] !== q[propName]) {
        return false
      }
    }
  }
  return true
}

export { deepEqual }
