import { Account, AccountFilters, AccountSortBy } from '@dcl/schemas'
import { IAccountsComponent } from '../../ports/accounts/types'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'

export function createAccountsSource(
  accounts: IAccountsComponent
): IMergerComponent.Source<Account, AccountFilters, AccountSortBy> {
  async function fetch(filters: FetchOptions<AccountFilters, AccountSortBy>) {
    const results = await accounts.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [AccountSortBy.MOST_SPENT]: +result.spent,
        [AccountSortBy.MOST_EARNED]: +result.earned,
        [AccountSortBy.MOST_PURCHASES]: result.purchases,
        [AccountSortBy.MOST_ROYALTIES]: +result.royalties,
        [AccountSortBy.MOST_SALES]: result.sales,
      },
    }))
  }

  async function count(filters: FetchOptions<AccountFilters, AccountSortBy>) {
    const total = await accounts.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}
