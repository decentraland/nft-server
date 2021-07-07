import { Network } from '@dcl/schemas'
import { Contract, ContractOptions, IContractsComponent } from './types'

export function createContractsComponent(options: {
  getContracts: () => Promise<Contract[]>
  network: Network
}): IContractsComponent {
  const { getContracts, network } = options

  async function fetch(options: ContractOptions) {
    if (options.network && options.network !== network) {
      return []
    }
    const contracts = await getContracts()
    return options.category
      ? contracts.filter((contract) => contract.category === options.category)
      : contracts
  }

  return {
    fetch,
  }
}
