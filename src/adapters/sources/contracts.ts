import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import {
  Contract,
  ContractFilters,
  ContractSortBy,
  IContractsComponent,
} from '../../ports/contracts/types'

export function createContractsSource(
  contracts: IContractsComponent
): IMergerComponent.Source<Contract, ContractFilters, ContractSortBy> {
  async function fetch(filters: FetchOptions<ContractFilters, ContractSortBy>) {
    const results = await contracts.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [ContractSortBy.NAME]: result.name.toLowerCase(),
      },
    }))
  }

  async function count(filters: FetchOptions<ContractFilters, ContractSortBy>) {
    const results = await contracts.fetch(filters)
    return results.length
  }

  return {
    fetch,
    count,
  }
}
