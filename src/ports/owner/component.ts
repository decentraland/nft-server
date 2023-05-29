import { IPgComponent } from '@well-known-components/pg-component'
import { getDbSchema } from '../../logic/db/connection'
import { HttpError } from '../../logic/http/response'
import { FetchOptions } from '../merger/types'
import {
  IOwnerDataComponent,
  OwnerCountDBRow,
  OwnerDBRow,
  OwnersFilters,
  OwnersSortBy,
} from './types'
import { getOwnersSQLQuery } from './utils'

export const BAD_REQUEST_ERROR_MESSAGE =
  "Couldn't fetch owners with the filters provided"

export function createOwnersComponent(options: {
  database: IPgComponent
}): IOwnerDataComponent {
  const { database } = options

  async function fetchAndCount(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ) {
    if (filters.itemId === undefined || !filters.contractAddress) {
      throw new HttpError(
        'itemId and contractAddress are neccesary params.',
        400
      )
    }

    try {
      const client = await database.getPool().connect()
      const schemaName = await getDbSchema(client, {
        contractAddress: filters.contractAddress,
      })

      if (!schemaName) {
        throw new HttpError('Contract not found', 404)
      }

      const parsedFilters: FetchOptions<OwnersFilters, OwnersSortBy> = {
        ...filters,
        sortBy: filters.sortBy as OwnersSortBy,
      }

      const ownersQuery = getOwnersSQLQuery(schemaName, parsedFilters)
      const ownersCountQuery = getOwnersSQLQuery(
        schemaName,
        parsedFilters,
        true
      )

      const [owners, ownersCount] = await Promise.all([
        client.query<OwnerDBRow>(ownersQuery),
        client.query<OwnerCountDBRow>(ownersCountQuery),
      ])

      const results = owners.rows.map((owner: OwnerDBRow) => ({
        issuedId: owner.issued_id,
        ownerId: owner.owner,
        tokenId: owner.token_id,
      }))

      return {
        data: results,
        total: Number(ownersCount.rows[0].count),
      }
    } catch (e) {
      throw new HttpError(BAD_REQUEST_ERROR_MESSAGE, 400)
    }
  }

  return {
    fetchAndCount,
  }
}
