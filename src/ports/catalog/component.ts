import { IPgComponent } from '@well-known-components/pg-component'
import { CatalogItem, Network } from '@dcl/schemas'
import {
  getCollectionsChainId,
  getMarketplaceChainId,
} from '../../logic/chainIds'
import { HttpError } from '../../logic/http/response'
import { enhanceItemsWithPicksStats } from '../../logic/favorites/utils'
import { IFavoritesComponent } from '../favorites/types'
import {
  ICatalogComponent,
  CollectionsItemDBResult,
  CatalogOptions,
} from './types'
import {
  getSubgraphNameForNetwork,
  getCatalogQuery,
  fromCollectionsItemDbResultToCatalogItem,
} from './utils'
import { getLatestSubgraphSchema } from './queries'

export function createCatalogComponent(options: {
  database: IPgComponent
  favoritesComponent: IFavoritesComponent
  isFavoritesEnabled: boolean
}): ICatalogComponent {
  const { database, favoritesComponent, isFavoritesEnabled } = options

  async function fetch(filters: CatalogOptions) {
    const { network } = filters
    const marketplaceChainId = getMarketplaceChainId()
    const collectionsChainId = getCollectionsChainId()
    let catalogItems: CatalogItem[] = []
    let total = 0
    const client = await database.getPool().connect()
    try {
      const sources = (
        network ? [network] : [Network.ETHEREUM, Network.MATIC]
      ).reduce((acc, curr) => {
        acc[curr] = getSubgraphNameForNetwork(
          curr,
          curr === Network.ETHEREUM ? marketplaceChainId : collectionsChainId
        )
        return acc
      }, {} as Record<string, string>)

      const latestSchemasPromises: Promise<Record<string, string>>[] =
        Object.entries(sources).map(async ([network, subgraphName]) => {
          const schemaName = await client.query<{
            entity_schema: string
          }>(getLatestSubgraphSchema(subgraphName))
          return {
            [network]: schemaName.rows[0].entity_schema,
          }
        })

      const schemas = await Promise.all(latestSchemasPromises)
      const results = await client.query<CollectionsItemDBResult>(
        getCatalogQuery(
          schemas.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
          filters
        )
      )
      catalogItems = results.rows.map((res) =>
        fromCollectionsItemDbResultToCatalogItem(res, network)
      )
      const totals = new Set(results.rows.map((res) => res.total_rows))
      totals.forEach((t) => (total += +t))

      if (isFavoritesEnabled) {
        const picksStats = await favoritesComponent.getPicksStatsOfItems(
          catalogItems.map(({ id }) => id),
          filters.pickedBy
        )

        catalogItems = enhanceItemsWithPicksStats(catalogItems, picksStats)
      }
    } catch (e) {
      throw new HttpError(
        "Couldn't fetch the catalog with the filters provided",
        400
      )
    }

    client.release()
    return { data: catalogItems, total }
  }

  return {
    fetch,
  }
}
