interface JsErrorData {
  type: string
  message?: string
  filename?: string
  lineno?: number
  colno?: number
  error?: Record<string, string>
  reason?: Record<string, string>
}

// Adjust the type of 'reason' based on your application's needs
interface UnhandledRejectionData {
  type: string
  reason: Error // Provide a more specific type for 'reason'
}

export type { JsErrorData, UnhandledRejectionData }
