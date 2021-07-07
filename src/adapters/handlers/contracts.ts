import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { ContractSortBy } from '../../ports/contracts/types'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { json } from '../../logic/http/response'

export function createContractsHandler(
  components: Pick<AppComponents, 'logs' | 'contracts'>
): IHttpServerComponent.IRequestHandler<Context<'/contracts'>> {
  const { contracts } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first', 0) // 0 is here so by default it returns all results
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<ContractSortBy>('sortBy', ContractSortBy)
    const network = params.getValue<Network>('network', Network)

    return json(() =>
      contracts.fetch({
        first,
        skip,
        sortBy,
        network,
      })
    )
  }
}
