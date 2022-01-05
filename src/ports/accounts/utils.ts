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
  }

  return account
}

export const getAccountFragment = (withRoyalties?: boolean) => `
  fragment accountFragment on Account {
    id
    address
    sales
    purchases
    spent
    earned
    ${withRoyalties ? 'royalties' : ''}
  }
`

export function getAccountsQuery(
  filters: AccountFilters,
  options?: {
    isCount?: boolean
    withRoyalties?: boolean
  }
) {
  const { first, skip, sortBy, id, address } = filters

  const where: string[] = []

  if (id) {
    where.push(`id: "${id}"`)
  }

  if (address) {
    where.push(`address: "${address}"`)
  }

  const max = 1000
  const total = options?.isCount
    ? max
    : typeof first !== 'undefined'
    ? typeof skip !== 'undefined'
      ? skip + first
      : first
    : max

  let orderBy: string
  let orderDirection: string
  switch (sortBy) {
    case AccountSortBy.MOST_PURCHASES:
      orderBy = 'purchases'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_ROYALTIES:
      orderBy = 'royalties'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_SALES:
      orderBy = 'sales'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_SPENT:
      orderBy = 'spent'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'earned'
      orderDirection = 'desc'
  }

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
    ${options?.isCount ? '' : getAccountFragment(options?.withRoyalties)}
  `
}
