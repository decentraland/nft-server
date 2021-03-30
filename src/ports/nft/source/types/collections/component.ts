import { NFTComponents } from '../../../types'
import { createNFTSourceComponent } from '../../component'
import { INFTSourceComponent } from '../../types'
import { NFTFragmet } from './fragment'
import { fromFragment, getOrderBy, getQuery } from './utils'

export function createCollectionsComponent(
  components: Pick<NFTComponents, 'collectionsSubgraph'>
): INFTSourceComponent {
  const { collectionsSubgraph } = components
  return createNFTSourceComponent<NFTFragmet>({
    subgraph: collectionsSubgraph,
    getOrderBy,
    getQuery,
    fromFragment,
  })
}
