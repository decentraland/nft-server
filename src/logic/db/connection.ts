import { PoolClient } from 'pg'
import { Network } from '@dcl/schemas'
import { getCollectionsChainId, getMarketplaceChainId } from '../chainIds'
import { getMarketplaceContracts } from '../contracts'
import { getLatestSubgraphSchema, getSubgraphNameForNetwork } from '../../subgraphUtils'

export const getDbSchema = async (
  client: PoolClient,
  options: {
    network?: Network
    contractAddress?: string
  }
) => {
  const marketplaceChainId = getMarketplaceChainId()
  const collectionsChainId = getCollectionsChainId()
  let network = options.network || Network.MATIC // defaults to MATIC

  if (options.contractAddress) {
    const marketplaceContracts = getMarketplaceContracts(
      getMarketplaceChainId()
    )

    const marketplaceContract = marketplaceContracts.find(
      (marketplaceContract) =>
        !!options.contractAddress &&
        marketplaceContract.address.toLocaleLowerCase() ===
          options.contractAddress
    )
    if (marketplaceContract) {
      network = Network.ETHEREUM
    }
  }

  const source = getSubgraphNameForNetwork(
    network,
    network === Network.ETHEREUM ? marketplaceChainId : collectionsChainId
  )
  const schemaQueryResult = await client.query<{
    entity_schema: string
  }>(getLatestSubgraphSchema(source))

  return schemaQueryResult.rows[0].entity_schema
}
