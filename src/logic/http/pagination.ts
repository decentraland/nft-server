import { URLSearchParams } from 'url'

const MAX_LIMIT = 100
const DEFAULT_PAGE = 0

export const getPaginationParams = (
  params: URLSearchParams
): { limit: number; offset: number } => {
  const limit = params.get('limit')
  const offset = params.get('offset')
  const page = params.get('page')
  const parsedLimit = parseInt(limit as string, 10)
  const parsedPage = parseInt(page as string, 10)
  const parsedOffset = parseInt(offset as string, 10)

  const paginationLimit =
    limit && !isNaN(parsedLimit) && parsedLimit <= MAX_LIMIT && parsedLimit > 0
      ? parsedLimit
      : MAX_LIMIT
  const paginationOffset = isNaN(parsedOffset)
    ? (page && !isNaN(parsedPage) && parsedPage >= 0
        ? parsedPage
        : DEFAULT_PAGE) * paginationLimit
    : parsedOffset

  return {
    limit: paginationLimit,
    offset: paginationOffset,
  }
}
