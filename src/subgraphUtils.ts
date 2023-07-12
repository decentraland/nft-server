import SQL from 'sql-template-strings'
import { ChainId, Network } from '@dcl/schemas'


export const getLatestSubgraphSchema = (subgraphName: string) =>
  SQL`
    SELECT 
        entity_schema 
    FROM
        satsuma.subgraph_schema 
    WHERE 
        satsuma_subgraph_name = ${subgraphName}
    `

export const getSubgraphNameForNetwork = (
  network: Network,
  chainId: ChainId
) => {
  return network === Network.ETHEREUM
    ? `collections-ethereum-${
        chainId === ChainId.ETHEREUM_MAINNET ? 'mainnet' : 'sepolia'
      }`
    : `collections-matic-${
        chainId === ChainId.MATIC_MAINNET ? 'mainnet' : 'mumbai'
      }`
}