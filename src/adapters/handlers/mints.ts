import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { MintSortBy } from '../../ports/mints/types'
import { AppComponents, Context } from '../../types'

export function createMintsHandler(
  components: Pick<AppComponents, 'logs' | 'mints'>
): IHttpServerComponent.IRequestHandler<Context<'/mints'>> {
  const { mints } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<MintSortBy>('sortBy', MintSortBy)
    const creator = params.getAddress('creator')
    const beneficiary = params.getAddress('beneficiary')
    const minter = params.getAddress('minter')
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const itemId = params.getString('itemId')
    const issuedId = params.getString('issuedId')
    const isSale = params.getBoolean('isSale')
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      mints.fetchAndCount({
        first,
        skip,
        sortBy,
        creator,
        beneficiary,
        minter,
        contractAddress,
        tokenId,
        itemId,
        issuedId,
        isSale,
        network,
      })
    )
  }
}
