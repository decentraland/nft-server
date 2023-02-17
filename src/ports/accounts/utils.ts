import { Account, AccountFilters, AccountSortBy } from '@dcl/schemas'
import { AccountFragment } from './types'

export const ACCOUNT_DEFAULT_SORT_BY = AccountSortBy.MOST_EARNED

export function fromAccountFragment(fragment: AccountFragment): Account {
  const account: Account = {
    id: fragment.id,
    address: fragment.address,
    sales: fragment.sales,
    purchases: fragment.purchases,
    spent: fragment.spent,
    earned: fragment.earned,
    royalties: fragment.royalties || '0',
    collections: fragment.collections || 0,
  }

  return account
}

export function getAccountsQuery(
  filters: AccountFilters,
  fragmentGetter: (withRoyalties?: boolean) => string,
  orderByGetter: (sortBy?: AccountSortBy) => {
    orderBy: string
    orderDirection: string
  },
  options?: {
    isCount?: boolean
    withRoyalties?: boolean
  }
) {
  const { first, skip, id, sortBy, address } = filters

  const where: string[] = []

  if (id) {
    where.push(`id: "${id}"`)
  }

  if (address && address.length > 0) {
    where.push(
      `address_in: [${address.map((address) => `"${address}"`).join(',')}]`
    )
  }

  const max = 1000
  const total = options?.isCount
    ? max
    : typeof first !== 'undefined'
    ? typeof skip !== 'undefined'
      ? skip + first
      : first
    : max

  const { orderBy, orderDirection } = orderByGetter(sortBy)

  return `
    query Accounts {
      accounts(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          ${where.join('\n')}
        }) 
        { ${options?.isCount ? 'id' : `...accountFragment`} }
    }
    ${options?.isCount ? '' : fragmentGetter(options?.withRoyalties)}
  `
}
