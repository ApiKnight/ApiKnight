import { useEffect, useRef } from 'react'

/**
 * 维护上一次的值
 * @param value 需要维护上次一次的值
 * @returns 上一次的值
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
