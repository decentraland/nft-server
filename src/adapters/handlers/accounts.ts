import { AccountSortBy, Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'

export function createAccountsHandler(
  components: Pick<AppComponents, 'logs' | 'accounts'>
): IHttpServerComponent.IRequestHandler<Context<'/accounts'>> {
  const { accounts } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<AccountSortBy>('sortBy', AccountSortBy)
    const id = params.getString('id')
    const address = params.getString('address')
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      accounts.fetchAndCount({
        first,
        skip,
        sortBy,
        id,
        address,
        network,
      })
    )
  }
}
