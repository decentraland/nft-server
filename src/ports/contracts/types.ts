import { Contract, Network, NFTCategory } from '@dcl/schemas'

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
