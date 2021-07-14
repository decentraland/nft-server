import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { json } from '../../logic/http/response'
import {
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../../ports/nfts/types'
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
    const wearableRarities = params.getList<WearableRarity>(
      'wearableRarity',
      WearableRarity
    )
    const wearableGenders = params.getList<WearableGender>(
      'wearableGender',
      WearableGender
    )
    const contractAddresses = params.getAddressList('contractAddress')
    const blockchainId = params.getString('blockchainId')
    const network = params.getValue<Network>('network', Network)

    return json(() =>
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
        contractAddresses,
        blockchainId,
        network,
      })
    )
  }
}
