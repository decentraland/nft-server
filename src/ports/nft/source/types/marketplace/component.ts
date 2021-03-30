import { NFTComponents } from '../../../types'
import { createNFTSourceComponent } from '../../component'
import { INFTSourceComponent } from '../../types'
import { NFTFragmet } from './fragment'
import { fromFragment, getOrderBy, getQuery } from './utils'

export function createMarketplaceComponent(
  components: Pick<NFTComponents, 'marketplaceSubgraph'>
): INFTSourceComponent {
  const { marketplaceSubgraph } = components
  return createNFTSourceComponent<NFTFragmet>({
    subgraph: marketplaceSubgraph,
    getOrderBy,
    getQuery,
    fromFragment,
  })
}
