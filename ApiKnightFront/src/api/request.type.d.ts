interface Result<T> {
  code: number
  message: string
  result?: T
  data?: T
}
export type { Result }
