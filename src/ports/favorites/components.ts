import pLimit from 'p-limit'
import { IFetchComponent } from '@well-known-components/http-server'
import {
  FavoritesServerResponse,
  IFavoritesComponent,
  PickStats,
} from './types'
import { processRequestError } from '../utils'

const MAX_CONCURRENT_REQUEST = 5
const MAX_URL_LENGTH = 2048

export function createFavoritesComponent(
  { fetch: fetchComponent }: { fetch: IFetchComponent },
  favoritesUrl: string
): IFavoritesComponent {
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

    return results.flatMap((result) => result.data)
  }

  return {
    getPicksStatsOfItems,
  }
}
