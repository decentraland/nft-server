import { IPgComponent } from '@well-known-components/pg-component'
import { Item, Network } from '@dcl/schemas'
import { HttpError } from '../../logic/http/response'
import { getLatestSubgraphSchema } from '../../subgraphUtils'
import { enhanceItemsWithPicksStats } from '../../logic/favorites/utils'
import { IFavoritesComponent } from '../favorites/types'
import {
  ICatalogComponent,
  CollectionsItemDBResult,
  CatalogOptions,
} from './types'
import {
  getCatalogQuery,
  fromCollectionsItemDbResultToCatalogItem,
  getQuerySources,
} from './utils'
import { getItemIdsBySearchTextQuery } from './queries'

export function createCatalogComponent(options: {
  database: IPgComponent
  favoritesComponent: IFavoritesComponent
}): ICatalogComponent {
  const { database, favoritesComponent } = options

  async function fetch(filters: CatalogOptions) {
    const { network } = filters
    let catalogItems: Item[] = []
    let total = 0
    const client = await database.getPool().connect()
    try {
      const sources = getQuerySources(filters)

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
        const filteredItems = []
        for (const schema of Object.values(reducedSchemas)) {
          const filteredItemsById = await client.query<{
            id: string
            similarity: number
          }>(getItemIdsBySearchTextQuery(schema, filters))
          filteredItems.push(...filteredItemsById.rows)
        }
        filteredItems?.sort((a, b) => b.similarity - a.similarity)
        filters.ids = [
          ...(filters.ids ?? []),
          ...filteredItems.map(({ id }) => id),
        ]

        if (filters.ids?.length === 0) {
          // if no items matched the search text, return empty result
          return { data: [], total: 0 }
        }
      }
      const query = getCatalogQuery(reducedSchemas, filters)
      const results = await client.query<CollectionsItemDBResult>(query)
      catalogItems = results.rows.map((res) =>
        fromCollectionsItemDbResultToCatalogItem(
          res,
          network as Network.ETHEREUM | Network.MATIC
        )
      )
      total = results.rows[0]?.total ?? results.rows[0]?.total_rows ?? 0

      const picksStats = await favoritesComponent.getPicksStatsOfItems(
        catalogItems.map(({ id }) => id),
        filters.pickedBy
      )

      catalogItems = enhanceItemsWithPicksStats(catalogItems, picksStats)
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
