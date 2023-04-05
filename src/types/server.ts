export type ServerErrorResponse<T> = {
  ok: boolean
  message: string
  data?: T
}
