import SQL from 'sql-template-strings'
import { ILoggerComponent } from '@well-known-components/interfaces'
import { IBuilderComponent } from './types'
import { IPgComponent } from '@well-known-components/pg-component'

export function createBuilderComponent(options: {
  logs: ILoggerComponent
  database: IPgComponent
}): IBuilderComponent {
  const { database, logs } = options
  const logger = logs.getLogger('builder-component')

  return {
    async getItemUtility(
      collectionAddress: string,
      itemId: string
    ): Promise<string | undefined> {
      try {
        const query = SQL`SELECT items.utility
          FROM items
          INNER JOIN collections ON items.collection_id = collections.id
          WHERE items.blockchain_item_id = ${itemId} AND collections.contract_address = ${collectionAddress}`

        const result = await database.query<{ utility: string | null }>(query)
        if (!result.rowCount) {
          throw new Error(
            'Failed getting the utility for the item: the item was not found in the DB'
          )
        }
        return result.rows[0].utility ?? undefined
      } catch (_e) {
        logger.info(
          `Failed looking for the utility of the item: ${collectionAddress} - ${itemId}.`
        )
        return undefined
      }
    },
  }
}
