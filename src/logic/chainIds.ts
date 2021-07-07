import { ChainId } from '@dcl/schemas'

export const getCollectionsChainId = () =>
  parseInt(
    process.env.COLLECTIONS_CHAIN_ID || ChainId.ETHEREUM_MAINNET.toString()
  ) as ChainId

export const getMarketplaceChainId = () =>
  parseInt(
    process.env.MARKETPLACE_CHAIN_ID || ChainId.ETHEREUM_MAINNET.toString()
  ) as ChainId
