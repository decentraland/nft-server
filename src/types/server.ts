export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  LOCKED = 423,
  CONFLICT = 409,
  ERROR = 500,
  UNPROCESSABLE_CONTENT = 422,
}

export type PaginatedResponse<T> = {
  results: T[]
  total: number
  page: number
  pages: number
  limit: number
}

export type HTTPErrorResponseBody<T> = {
  ok: false
  message: string
  data?: T
}

export type HTTPSuccessResponseBody<T> = {
  ok: true
  data: T
}

export type HTTPResponseBody<T> =
  | HTTPErrorResponseBody<T>
  | HTTPSuccessResponseBody<T>

export type HTTPResponse<T> = {
  status: StatusCode
  body: HTTPResponseBody<T>
}
