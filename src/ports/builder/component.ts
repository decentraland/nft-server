import { URL } from 'url'
import {
  IFetchComponent,
  ILoggerComponent,
} from '@well-known-components/interfaces'
import { IBuilderComponent } from './types'

export function createBuilderComponent(options: {
  url: string
  logs: ILoggerComponent
  fetcher: IFetchComponent
}): IBuilderComponent {
  const { fetcher, url, logs } = options
  const logger = logs.getLogger('builder-component')

  return {
    async getItemUtility(
      collectionAddress: string,
      itemId: string
    ): Promise<string | undefined> {
      try {
        const baseUrl = new URL(url)
        baseUrl.pathname = `/v1/published-collections/${collectionAddress}/items/${itemId}/utility`
        const response = await fetcher.fetch(baseUrl.toString())
        if (!response.ok) {
          throw new Error(
            `Failed to fetch utility for item: ${response.status}`
          )
        }
        const utility = (await response.json()) as {
          data: { utility: string | null }
        }
        return utility.data.utility ?? undefined
      } catch (_e) {
        logger.info(
          `Failed looking for the utility of the item: ${collectionAddress} - ${itemId}.`
        )
        return undefined
      }
    },
  }
}
