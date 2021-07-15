import { Contract, Network, NFTCategory } from '@dcl/schemas'
export { Contract }

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
