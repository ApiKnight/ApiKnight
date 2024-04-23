interface JsErrorData {
  type: string
  message: string
  filename: string
  lineno: number
  colno: number
  error: object
  reason: object
}

export type { JsErrorData }
