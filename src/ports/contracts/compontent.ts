import { Contract, Network } from '@dcl/schemas'
import { ContractFilters, IContractsComponent } from './types'

export function createContractsComponent(options: {
  getContracts: () => Promise<Contract[]>
  network: Network
}): IContractsComponent {
  const { getContracts, network } = options

  async function fetch(filters: ContractFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }
    const contracts = await getContracts()
    return filters.category
      ? contracts.filter((contract) => contract.category === filters.category)
      : contracts
  }

  return {
    fetch,
  }
}
