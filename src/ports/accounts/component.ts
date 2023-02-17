import { AccountFilters, AccountSortBy, ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AccountFragment, IAccountsComponent } from './types'
import { fromAccountFragment, getAccountsQuery } from './utils'

export function createAccountsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
  getFragment: (withRoyalties?: boolean) => string
  getSortByProp: (sortBy?: AccountSortBy) => {
    orderBy: string
    orderDirection: string
  }
}): IAccountsComponent {
  const { subgraph, network, getFragment, getSortByProp } = options

  function isValid(filters: AccountFilters) {
    return (
      // Querying a different network to the component's one is not valid
      (!filters.network || filters.network === network) &&
      // Sorting by "most_royalties" on Ethereum is not valid
      (filters.sortBy !== AccountSortBy.MOST_ROYALTIES ||
        network !== Network.ETHEREUM)
    )
  }

  async function fetch(filters: AccountFilters) {
    if (!isValid(filters)) {
      return []
    }

    const query = getAccountsQuery(filters, getFragment, getSortByProp, {
      withRoyalties: network === Network.MATIC,
    })

    const { accounts: fragments } = await subgraph.query<{
      accounts: AccountFragment[]
    }>(query)

    const accounts = fragments.map((fragment) => fromAccountFragment(fragment))

    return accounts
  }

  async function count(filters: AccountFilters) {
    if (!isValid(filters)) {
      return 0
    }

    const query = getAccountsQuery(filters, getFragment, getSortByProp, {
      isCount: true,
    })
    const { accounts: fragments } = await subgraph.query<{
      accounts: AccountFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
