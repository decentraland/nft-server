import { ChainId, Network, SaleFilters, SaleType } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { SaleFragment, ISalesComponent } from './types'
import { fromSaleFragment, getSalesQuery } from './utils'

export function createSalesComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): ISalesComponent {
  const { subgraph, network, chainId } = options

  function isValid(network: Network, filters: SaleFilters) {
    return (
      // Querying a different network to the component's one is not valid
      (!filters.network || filters.network === network) &&
      // Querying a SaleType.MINT on Ethereum is not valid
      (filters.type !== SaleType.MINT || network !== Network.ETHEREUM)
    )
  }

  async function fetch(filters: SaleFilters) {
    if (!isValid(network, filters)) {
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
    if (!isValid(network, filters)) {
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
