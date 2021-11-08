import { Contract, ContractFilters } from '@dcl/schemas'

export interface IContractsComponent {
  fetch(filters: ContractFilters): Promise<Contract[]>
}
