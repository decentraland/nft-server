import { ChainId, Network, SaleFilters } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { SaleFragment, ISalesComponent } from './types'
import { fromSaleFragment, getSalesQuery } from './utils'

export function createSalesComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): ISalesComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: SaleFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getSalesQuery(filters, false, network)
    const { sales: fragments } = await subgraph.query<{
      sales: SaleFragment[]
    }>(query)

    const sales = fragments.map((fragment) =>
      fromSaleFragment(fragment, network, chainId)
    )

    return sales
  }

  async function count(filters: SaleFilters) {
    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getSalesQuery(filters, true, network)
    const { sales: fragments } = await subgraph.query<{
      sales: SaleFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
