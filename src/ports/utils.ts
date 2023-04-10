import { Response } from 'node-fetch'
import pLimit from 'p-limit'
import { GenderFilterOption, WearableGender } from '@dcl/schemas'
import { IFetchComponent } from '@well-known-components/http-server'
import {
  HTTPErrorResponseBody,
  HTTPSuccessResponseBody,
  PaginatedResponse,
} from '../types/server'

export const MAX_CONCURRENT_REQUEST = 5
export const MAX_URL_LENGTH = 2048

export function getGenderFilterQuery(
  genders: (WearableGender | GenderFilterOption)[],
  isEmote: boolean
): string {
  const hasMale = genders.includes(GenderFilterOption.MALE)
  const hasFemale = genders.includes(GenderFilterOption.FEMALE)
  const hasUnisex = genders.includes(GenderFilterOption.UNISEX)
  const searchProperty = isEmote
    ? 'searchEmoteBodyShapes'
    : 'searchWearableBodyShapes'

  if (genders.length === 1) {
    if (hasMale) {
      return `${searchProperty}: [BaseMale]`
    }

    if (hasFemale) {
      return `${searchProperty}: [BaseFemale]`
    }

    return `${searchProperty}_contains: [BaseMale, BaseFemale]`
  }

  if (genders.length === 2) {
    if (hasMale && hasFemale) {
      return `${searchProperty}_contains: [BaseMale, BaseFemale]`
    }

    if (hasMale && hasUnisex) {
      return `${searchProperty}_contains: [BaseMale]`
    }

    return `${searchProperty}_contains: [BaseFemale]`
  }

  return ''
}

export async function processRequestError(action: string, response: Response) {
  let parsedErrorResult: HTTPErrorResponseBody<any> | undefined

  try {
    parsedErrorResult = await response.json()
  } catch (_) {
    // Ignore the JSON parse result error error.
  }

  if (parsedErrorResult) {
    throw new Error(parsedErrorResult.message)
  }

  throw new Error(
    `Error ${action}, the server responded with: ${response.status}`
  )
}

export function isPaginated<T>(
  data: T | PaginatedResponse<T>
): data is PaginatedResponse<T> {
  return (data as PaginatedResponse<T>).results !== undefined
}

export async function queryMultipleTimesWhenExceedingUrlLimit<T>(
  baseUrl: string,
  queryParameterName: string,
  queryParameterValues: string[],
  fetchComponent: IFetchComponent
): Promise<T[]> {
  const limit = pLimit(MAX_CONCURRENT_REQUEST)

  // Build URLs to get all the queried results
  let urls: string[] = []
  let url = baseUrl

  const alreadyHasQueryParams = baseUrl.includes('?')

  for (let value of queryParameterValues) {
    const param =
      (alreadyHasQueryParams ? `&` : '') + `${queryParameterName}=${value}`

    if (url.length < MAX_URL_LENGTH) {
      url += param
    } else {
      urls.push(url)
      url = baseUrl + param
    }
  }

  // Push the last url
  if (url !== baseUrl) {
    urls.push(url)
  }

  const results: HTTPSuccessResponseBody<T | PaginatedResponse<T>>[] =
    await Promise.all(
      urls.map((url) =>
        limit(async () => {
          try {
            const response = await fetchComponent.fetch(url)
            if (!response.ok) {
              await processRequestError('fetching favorites', response)
            }

            const parsedResult = await response.json()
            if (!parsedResult.ok) {
              throw new Error(parsedResult.message)
            }

            return parsedResult
          } catch (error) {
            limit.clearQueue()
            throw error
          }
        })
      )
    )

  return results.flatMap(({ data }) =>
    isPaginated(data) ? data.results : data
  )
}
