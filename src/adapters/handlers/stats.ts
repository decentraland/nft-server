import etag from 'etag'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { ResourceStats, StatsResource } from '../../ports/stats/types'

const MAX_AGE = 3600 // 1 HOUR

export function createStatsHandler(
  components: Pick<AppComponents, 'stats'>
): IHttpServerComponent.IRequestHandler<Context<'/stats/:resource/:stat'>> {
  const { stats } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const { resource, stat } = context.params
    const isOnSale = params.getBoolean('isOnSale')

    return asJSON(
      async () => ({
        data: await stats.fetch({
          resource: resource as StatsResource,
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
