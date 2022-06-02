import { Rarity, WearableCategory } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { ItemsDayDataSortBy } from '../../ports/rankings/types'
import { AppComponents, Context } from '../../types'

export function createRankingsHandler(
  components: Pick<AppComponents, 'rankings'>
): IHttpServerComponent.IRequestHandler<Context<'/rankings/:timeframe'>> {
  const { rankings } = components

  return async (context) => {
    const { timeframe } = context.params
    const params = new Params(context.url.searchParams)
    const sortBy = params.getValue<ItemsDayDataSortBy>(
      'sortBy',
      ItemsDayDataSortBy
    )
    const category = params.getValue<WearableCategory>(
      'category',
      WearableCategory
    )
    const rarity = params.getValue<Rarity>('rarity', Rarity)

    return asJSON(async () => ({
      data: await rankings.fetch({
        from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
        sortBy,
        category,
        rarity,
      }),
    }))
  }
}
