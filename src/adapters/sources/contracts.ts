import { FetchOptions, Source } from '../../ports/merger/types'
import {
  Contract,
  ContractOptions,
  ContractSortBy,
  IContractsComponent,
} from '../../ports/contracts/types'

export function createContractsSource(
  contracts: IContractsComponent
): Source<Contract, ContractOptions, ContractSortBy> {
  async function fetch(options: FetchOptions<ContractOptions, ContractSortBy>) {
    const results = await contracts.fetch(options)
    return results.map((result) => ({
      result,
      sort: {
        [ContractSortBy.NAME]: result.name.toLowerCase(),
      },
    }))
  }

  async function count(options: FetchOptions<ContractOptions, ContractSortBy>) {
    const results = await contracts.fetch(options)
    return results.length
  }

  return {
    fetch,
    count,
  }
}
