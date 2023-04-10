import { IFetchComponent } from '@well-known-components/http-server'
import { queryMultipleTimesWhenExceedingUrlLimit } from '../utils'
import { IFavoritesComponent, PickStats } from './types'

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

    return queryMultipleTimesWhenExceedingUrlLimit(
      baseUrl,
      'itemId',
      itemIds,
      fetchComponent
    )
  }

  return {
    getPicksStatsOfItems,
  }
}
