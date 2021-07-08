import { ChainId, Network } from '@dcl/schemas'
import { NFTCategory } from '../nfts/types'

export type Contract = {
  name: string
  address: string
  category: NFTCategory
  network: Network
  chainId: ChainId
}

export type ContractFilters = {
  category?: NFTCategory
  network?: Network
}

export enum ContractSortBy {
  NAME = 'name',
}

export interface IContractsComponent {
  fetch(filters: ContractFilters): Promise<Contract[]>
}
