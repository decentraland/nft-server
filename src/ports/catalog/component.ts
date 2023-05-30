import { IPgComponent } from '@well-known-components/pg-component'
import { Item, Network } from '@dcl/schemas'
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
import { getItemIdsBySearchTextQuery, getLatestSubgraphSchema } from './queries'

export function createCatalogComponent(options: {
  database: IPgComponent
  favoritesComponent: IFavoritesComponent
  isFavoritesEnabled: boolean
}): ICatalogComponent {
  const { database, favoritesComponent, isFavoritesEnabled } = options

  async function fetch(filters: CatalogOptions) {
    const { network, creator } = filters
    const marketplaceChainId = getMarketplaceChainId()
    const collectionsChainId = getCollectionsChainId()
    let catalogItems: Item[] = []
    let total = 0
    const client = await database.getPool().connect()
    try {
      const sources = (
        network
          ? [network]
          : creator
          ? [Network.MATIC]
          : [Network.ETHEREUM, Network.MATIC]
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
      const reducedSchemas = schemas.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      )
      if (filters.search) {
        for (const schema of Object.values(reducedSchemas)) {
          const filteredItemsById = await client.query<CollectionsItemDBResult>(
            getItemIdsBySearchTextQuery(schema, filters.search)
          )
          if (filteredItemsById.rowCount === 0) {
            // if no items matched the search text, return empty result
            client.release()
            return { data: [], total: 0 }
          }
          filters.ids = [
            ...(filters.ids ?? []),
            ...filteredItemsById.rows.map(({ id }) => id),
          ]
        }
      }
      const results = await client.query<CollectionsItemDBResult>(
        getCatalogQuery(reducedSchemas, filters)
      )
      catalogItems = results.rows.map((res) =>
        fromCollectionsItemDbResultToCatalogItem(res, network)
      )
      total = results.rows[0]?.total ?? results.rows[0]?.total_rows ?? 0

      if (isFavoritesEnabled) {
        const picksStats = await favoritesComponent.getPicksStatsOfItems(
          catalogItems.map(({ id }) => id),
          filters.pickedBy
        )

        catalogItems = enhanceItemsWithPicksStats(catalogItems, picksStats)
      }
    } catch (e) {
      console.error(e)
      throw new HttpError(
        "Couldn't fetch the catalog with the filters provided",
        400
      )
    } finally {
      client.release()
    }

    return { data: catalogItems, total: +total }
  }

  return {
    fetch,
  }
}
