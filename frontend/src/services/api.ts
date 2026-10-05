const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api'

export type FieldErrors = Record<string, string[]>

export class ApiError extends Error {
  status: number
  fieldErrors: FieldErrors | null

  constructor(message: string, status: number, fieldErrors: FieldErrors | null = null) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
    this.name = 'ApiError'
  }
}

function isFieldErrors(value: unknown): value is FieldErrors {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const entries = Object.values(value as Record<string, unknown>)
  return entries.length > 0 && entries.every((v) => Array.isArray(v))
}

function firstFieldMessage(errors: FieldErrors): string {
  for (const messages of Object.values(errors)) {
    if (messages.length > 0) return messages[0]
  }
  return 'Request failed'
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    let fieldErrors: FieldErrors | null = null
    try {
      const body: unknown = await response.json()
      if (isFieldErrors(body)) {
        fieldErrors = body
        message = firstFieldMessage(body)
      } else if (body && typeof body === 'object') {
        const record = body as Record<string, unknown>
        if (typeof record.detail === 'string') message = record.detail
        else if (typeof record.message === 'string') message = record.message
      }
    } catch {
      // response had no JSON body
    }
    throw new ApiError(message, response.status, fieldErrors)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
}