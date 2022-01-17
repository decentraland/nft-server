import {
  ItemSortBy,
  Network,
  Rarity,
  WearableCategory,
  WearableGender,
} from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'

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
    const isWearableSmart = params.getBoolean('isWearableSmart')
    const wearableCategory = params.getValue<WearableCategory>(
      'wearableCategory',
      WearableCategory
    )
    const rarities = params.getList<Rarity>('rarity', Rarity)
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
        rarities,
        isSoldOut,
        isOnSale,
        search,
        isWearableHead,
        isWearableAccessory,
        wearableCategory,
        wearableGenders,
        contractAddress,
        itemId,
        isWearableSmart,
        network,
      })
    )
  }
}
