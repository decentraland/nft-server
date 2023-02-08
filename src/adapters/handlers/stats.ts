import etag from 'etag'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { ResourceStats, StatsCategory } from '../../ports/stats/types'

const MAX_AGE = 3600 // 1 HOUR

export function createStatsHandler(
  components: Pick<AppComponents, 'stats'>
): IHttpServerComponent.IRequestHandler<Context<'/stats/:category/:stat'>> {
  const { stats } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const { category, stat } = context.params
    const isOnSale = params.getBoolean('isOnSale')

    return asJSON(
      async () => ({
        data: await stats.fetch({
          category: category as StatsCategory,
          stat: stat as unknown as ResourceStats,
          isOnSale,
        }),
      }),
      {
        'Cache-Control': `public,max-age=${MAX_AGE},s-maxage=${MAX_AGE}`,
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString(),
      },
      (data: any) => {
        const dataString = JSON.stringify(data)
        return {
          ETag: etag(dataString),
          'content-length': dataString.length.toString(),
        }
      }
    )
  }
}
