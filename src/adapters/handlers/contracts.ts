import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { ContractSortBy } from '../../ports/contracts/types'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'

export function createContractsHandler(
  components: Pick<AppComponents, 'logs' | 'contracts'>
): IHttpServerComponent.IRequestHandler<Context<'/contracts'>> {
  const { contracts } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<ContractSortBy>('sortBy', ContractSortBy)
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      contracts.fetchAndCount({
        first,
        skip,
        sortBy,
        network,
      })
    )
  }
}
