import { Network, Rarity, WearableCategory } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { WearableGender } from '../../ports/nfts/types'
import { ItemSortBy } from '../../ports/items/types'

export function createItemsHandler(
  components: Pick<AppComponents, 'logs' | 'items'>
): IHttpServerComponent.IRequestHandler<Context<'/items'>> {
  const { items } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<ItemSortBy>('sortBy', ItemSortBy)
    const creator = params.getAddress('creator')
    const isSoldOut = params.getBoolean('isSoldOut')
    const isOnSale = params.getBoolean('isOnSale')
    const search = params.getString('search')
    const isWearableHead = params.getBoolean('isWearableHead')
    const isWearableAccessory = params.getBoolean('isWearableAccessory')
    const wearableCategory = params.getValue<WearableCategory>(
      'wearableCategory',
      WearableCategory
    )
    const wearableRarities = params.getList<Rarity>('wearableRarity', Rarity)
    const wearableGenders = params.getList<WearableGender>(
      'wearableGender',
      WearableGender
    )
    const contractAddress = params.getAddress('contractAddress')
    const itemId = params.getString('itemId')
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      items.fetchAndCount({
        first,
        skip,
        sortBy,
        creator,
        isSoldOut,
        isOnSale,
        search,
        isWearableHead,
        isWearableAccessory,
        wearableCategory,
        wearableRarities,
        wearableGenders,
        contractAddress,
        itemId,
        network,
      })
    )
  }
}
