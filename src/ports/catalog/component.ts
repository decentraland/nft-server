import SQL, { SQLStatement } from 'sql-template-strings'
import { OrderFilters } from '@dcl/schemas'
import { IPgComponent } from '@well-known-components/pg-component'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { CatalogFilters, CatalogItem, ICatalogComponent } from './types'

export function createCatalogComponent(options: {
  database: IPgComponent
}): ICatalogComponent {
  const { database } = options

  async function fetch(filters: CatalogFilters) {
    const client = await database.getPool().connect()
    console.log('client: ', client)
    console.log('database: ', database)
    let catalogItems = []
    try {
      const queryResults = await client.query<CatalogItem>(
        SQL`
          SELECT 
            set_config(
              'search_path', 
              (
                SELECT 
                  entity_schema 
                FROM 
                  satsuma.subgraph_schema 
                WHERE 
                  satsuma_subgraph_name = 'collections-matic-mainnet'
              ), 
              FALSE
            );
            SELECT 
            items.id, 
            metadata_wearable, 
            items.image, 
            items.blockchain_id,
            items.collection,
            items.rarity,
            items.item_type,
            items.price,
            items.available,
            items.search_is_store_minter,
            items.creator,
            items.beneficiary,
            items.created_at,
            items.updated_at,
            items.reviewed_at,
            items.sold_at,
            items.first_listed_at,
            nfts.min_price AS min_listing_price,
            nfts.max_price AS max_listing_price, 
            nfts.listings_count as listings_count,
            (
              CASE WHEN available > 0 THEN LEAST(
                items.price, 
                nfts.min_price
              ) ELSE nfts.min_price END
            ) AS min_price 
          FROM 
            sgd630.item AS items 
          JOIN (
            SELECT 
              nft.item, 
              COUNT(orders.id) AS listings_count,
              MIN(orders.price) AS min_price,
              MAX(orders.price) AS max_price
            FROM 
              sgd630.nft AS nft 
            JOIN 
              sgd630.order AS orders ON orders.nft = nft.id 
            WHERE 
              orders.status = 'open' 
              AND orders.expires_at < 253378408747000 -- some expires_at have invalid values
            AND to_timestamp(
              orders.expires_at / 1000.0
            ) > now() 
            GROUP BY 
              nft.item
          ) AS nfts ON nfts.item = items.id 
          JOIN (
            SELECT metadata.id, wearable.description, wearable.category, wearable.body_shapes, wearable.rarity, wearable.name from sgd630.wearable JOIN sgd630.metadata as metadata ON metadata.wearable = wearable.id
          ) as metadata_wearable ON metadata_wearable.id = items.metadata
          WHERE upper(items.block_range) is null 
          ORDER BY min_price
          LIMIT 20
          OFFSET 0
        `
      )
      console.log('queryResults: ', queryResults)
      catalogItems = queryResults.rows
    } catch (e) {
      console.log('e: ', e)
    }
    return catalogItems
  }

  return {
    fetch,
  }
}
