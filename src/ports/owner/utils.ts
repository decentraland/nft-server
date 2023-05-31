import SQL from 'sql-template-strings'
import { FetchOptions } from '../merger/types'
import { OwnersFilters, OwnersSortBy } from './types'

export const OWNERS_QUERY_DEFAULT_OFFSET = 0
export const OWNERS_QUERY_DEFAULT_LIMIT = 20

export const getOwnersSQLQuery = (
  schemaVersion: string,
  filters: FetchOptions<OwnersFilters, OwnersSortBy>,
  isCount = false
) => {
  const { contractAddress, skip, first, sortBy, itemId } = filters

  const fields = isCount
    ? SQL`COUNT(*)`
    : SQL`nfts.owner, nfts.issued_id, nfts.token_id`

  const query = SQL`SELECT `
    .append(fields)
    .append(` FROM `)
    .append(schemaVersion)
    .append(`.nft_active AS nfts`)

  const where = [
    contractAddress
      ? SQL`left(nfts.contract_address, 256) = ${contractAddress}`
      : undefined,
    itemId ? SQL`nfts.item_blockchain_id = ${itemId}` : undefined,
  ].filter(Boolean)

  if (where.length) {
    query.append(` WHERE `)
    where.forEach((whereClause, index) => {
      if (whereClause) {
        query.append(whereClause)
        if (index < where.length - 1) {
          query.append(` AND `)
        }
      }
    })
  }

  if (!isCount) {
    if (sortBy) {
      switch (sortBy) {
        case OwnersSortBy.ISSUED_ID:
          query.append(SQL` ORDER BY issued_id`)
          break
        default:
          break
      }
      query.append(filters.orderDirection === 'asc' ? SQL` ASC` : SQL` DESC`)
    }
    query.append(
      skip !== undefined
        ? SQL` OFFSET ${skip}`
        : SQL` OFFSET ${OWNERS_QUERY_DEFAULT_OFFSET}`
    )

    query.append(
      first !== undefined
        ? SQL` LIMIT ${first}`
        : SQL` LIMIT ${OWNERS_QUERY_DEFAULT_LIMIT}`
    )
  }

  return query
}
