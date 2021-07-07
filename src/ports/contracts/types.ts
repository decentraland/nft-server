import { ChainId, Network } from '@dcl/schemas'
import { NFTCategory } from '../source/types'

export type Contract = {
  name: string
  address: string
  category: NFTCategory
  network: Network
  chainId: ChainId
}

export type ContractOptions = {
  category?: NFTCategory
  network?: Network
}

export enum ContractSortBy {
  NAME = 'name',
}

export interface IContractsComponent {
  fetch(options: ContractOptions): Promise<Contract[]>
}
