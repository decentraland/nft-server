import { EmoteCategory, Rarity, WearableCategory } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON, HttpError } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { RankingEntity, RankingsSortBy } from '../../ports/rankings/types'
import { AppComponents, Context } from '../../types'

export function createRankingsHandler(
  components: Pick<AppComponents, 'rankings'>
): IHttpServerComponent.IRequestHandler<
  Context<'/rankings/:entity/:timeframe'>
> {
  const { rankings } = components

  return async (context) => {
    const { entity, timeframe } = context.params
    const params = new Params(context.url.searchParams)
    const first = params.getNumber('first')
    const sortBy = params.getValue<RankingsSortBy>('sortBy', RankingsSortBy)
    const category = params.getValue<WearableCategory | EmoteCategory>(
      'category',
      { ...WearableCategory, ...EmoteCategory }
    )
    const rarity = params.getValue<Rarity>('rarity', Rarity)

    return asJSON(async () => {
      const supportedEntities = Object.values(RankingEntity)

      // @ts-ignore
      if (!supportedEntities.includes(entity)) {
        throw new HttpError(
          `Entity not supported: ${entity}. Supported entities are: ${supportedEntities.join(
            ', '
          )}`,
          400
        )
      }

      return {
        data: await rankings.fetch(entity as RankingEntity, {
          from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
          first,
          sortBy,
          category,
          rarity,
        }),
      }
    })
  }
}
