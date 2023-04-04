import pLimit from 'p-limit'
import { Response } from 'node-fetch'
import { IFetchComponent } from '@well-known-components/http-server'
import {
  FavoritesServerErrorResponse,
  FavoritesServerResponse,
  IFavoritesComponent,
  PickStats,
} from './types'

const MAX_CONCURRENT_REQUEST = 5
const MAX_URL_LENGTH = 2048

export function createFavoritesComponent(
  { fetch: fetchComponent }: { fetch: IFetchComponent },
  favoritesUrl: string
): IFavoritesComponent {
  async function processGetPicksStatsError(response: Response) {
    let parsedErrorResult: FavoritesServerErrorResponse<any> | undefined
    try {
      parsedErrorResult = await response.json()
    } catch (_) {
      // Ignore the JSON parse result error error.
    }

    if (parsedErrorResult) {
      throw new Error(parsedErrorResult.message)
    }

    throw new Error(
      `Error fetching rentals, the server responded with: ${response.status}`
    )
  }

  async function getPicksStatsOfItems(
    itemIds: string[],
    userAddress?: string
  ): Promise<PickStats[]> {
    const baseUrl = `${favoritesUrl}/v1/picks/stats?${
      userAddress ? 'checkingUserAddress=' + userAddress : ''
    }`
    const limit = pLimit(MAX_CONCURRENT_REQUEST)

    // Build URLs to get all the queried Picks Stats
    let urls: string[] = []
    let url = baseUrl
    for (let itemId of itemIds) {
      if (url.length < MAX_URL_LENGTH) {
        url += `&itemId=${itemId}`
      } else {
        urls.push(url)
        url = baseUrl + `&itemId=${itemId}`
      }
    }

    // Push the last url
    if (url !== baseUrl) {
      urls.push(url)
    }

    const results: FavoritesServerResponse<PickStats[]>[] = await Promise.all(
      urls.map((url) =>
        limit(async () => {
          try {
            const response = await fetchComponent.fetch(url)
            if (!response.ok) {
              await processGetPicksStatsError(response)
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

    return results.flatMap((result) => result.data)
  }

  return {
    getPicksStatsOfItems,
  }
}
