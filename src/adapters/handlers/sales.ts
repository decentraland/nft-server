import { Network, NFTCategory, SaleSortBy, SaleType } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'

export function createSalesHandler(
  components: Pick<AppComponents, 'sales'>
): IHttpServerComponent.IRequestHandler<Context<'/sales'>> {
  const { sales } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<SaleSortBy>('sortBy', SaleSortBy)
    const type = params.getValue<SaleType>('type', SaleType)
    const categories = params.getList<NFTCategory>('category', NFTCategory)
    const seller = params.getAddress('seller')
    const buyer = params.getAddress('buyer')
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const itemId = params.getString('itemId')
    const from = params.getNumber('from')
    const to = params.getNumber('to')
    const minPrice = params.getString('minPrice')
    const maxPrice = params.getString('maxPrice')
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      sales.fetchAndCount({
        first,
        skip,
        sortBy,
        type,
        categories,
        seller,
        buyer,
        contractAddress,
        tokenId,
        itemId,
        from,
        to,
        minPrice,
        maxPrice,
        network,
      })
    )
  }
}
