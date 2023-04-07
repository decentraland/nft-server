import { IPgComponent } from '@well-known-components/pg-component'
import { Network } from '@dcl/schemas'
import {
  CatalogFilters,
  CatalogItem,
  ICatalogComponent,
  CollectionsItemDBResult,
} from './types'
import {
  getSubgraphNameForNetwork,
  getCatalogQuery,
  fromCollectionsItemDbResultToCatalogItem,
} from './utils'
import {
  getCollectionsChainId,
  getMarketplaceChainId,
} from '../../logic/chainIds'
import { getLatestSubgraphSchema } from './queries'

export function createCatalogComponent(options: {
  database: IPgComponent
}): ICatalogComponent {
  const { database } = options

  async function fetch(filters: CatalogFilters) {
    const { network } = filters
    const marketplaceChainId = getMarketplaceChainId()
    const collectionsChainId = getCollectionsChainId()
    let catalogItems: CatalogItem[] = []
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
    } catch (e) {
      console.log(e)
    }

    client.release()
    return catalogItems
  }

  return {
    fetch,
  }
}
