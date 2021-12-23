import { AccountFilters, ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { AccountFragment, IAccountsComponent } from './types'
import { fromAccountFragment, getAccountsQuery } from './utils'

export function createAccountsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IAccountsComponent {
  const { subgraph, network } = options

  async function fetch(filters: AccountFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getAccountsQuery(filters, {
      withRoyalties: network === Network.MATIC,
    })

    const { accounts: fragments } = await subgraph.query<{
      accounts: AccountFragment[]
    }>(query)

    const accounts = fragments.map((fragment) => fromAccountFragment(fragment))

    return accounts
  }

  async function count(filters: AccountFilters) {
    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getAccountsQuery(filters, { isCount: true })
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
