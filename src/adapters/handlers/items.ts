import { ethers } from 'ethers'
import {
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  ItemSortBy,
  Network,
  NFTCategory,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'

export function createItemsHandler(
  components: Pick<AppComponents, 'items'>
): IHttpServerComponent.IRequestHandler<Context<'/items'>> {
  const { items } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<ItemSortBy>('sortBy', ItemSortBy)
    const category = params.getValue<NFTCategory>('category', NFTCategory)
    const creator = params.getList('creator')
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
    const wearableGenders = params.getList<GenderFilterOption>(
      'wearableGender',
      GenderFilterOption
    )
    const emoteCategory = params.getValue<EmoteCategory>(
      'emoteCategory',
      EmoteCategory
    )
    const emoteGenders = params.getList<GenderFilterOption>(
      'emoteGender',
      GenderFilterOption
    )
    const emotePlayMode = params.getList<EmotePlayMode>(
      'emotePlayMode',
      EmotePlayMode
    )
    const contractAddresses = params.getList('contractAddress')
    const itemId = params.getString('itemId')
    const network = params.getValue<Network>('network', Network)
    const maxPrice = params.getString('maxPrice')
    const minPrice = params.getString('minPrice')
    const urns = params.getList('urn')

    return asJSON(() =>
      items.fetchAndCount({
        first,
        skip,
        sortBy,
        category,
        creator,
        rarities,
        isSoldOut,
        isOnSale,
        search,
        isWearableHead,
        isWearableAccessory,
        wearableCategory,
        wearableGenders,
        emoteCategory,
        emoteGenders,
        emotePlayMode,
        contractAddresses,
        itemId,
        isWearableSmart,
        network,
        maxPrice: maxPrice
          ? ethers.utils.parseEther(maxPrice).toString()
          : undefined,
        minPrice: minPrice
          ? ethers.utils.parseEther(minPrice).toString()
          : undefined,
        urns,
      })
    )
  }
}
