import { ethers } from 'ethers'
import {
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  NFTCategory,
  Network,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { Params } from '../../logic/http/params'

export const getItemsParams = (params: Params) => {
  const maxPrice = params.getString('maxPrice')
  const minPrice = params.getString('minPrice')
  return {
    category: params.getValue<NFTCategory>('category', NFTCategory),
    creator: params.getList('creator'),
    isSoldOut: params.getBoolean('isSoldOut'),
    isOnSale: params.getBoolean('isOnSale'),
    search: params.getString('search'),
    isWearableHead: params.getBoolean('isWearableHead'),
    isWearableAccessory: params.getBoolean('isWearableAccessory'),
    isWearableSmart: params.getBoolean('isWearableSmart'),
    wearableCategory: params.getValue<WearableCategory>(
      'wearableCategory',
      WearableCategory
    ),
    rarities: params.getList<Rarity>('rarity', Rarity),
    wearableGenders: params.getList<GenderFilterOption>(
      'wearableGender',
      GenderFilterOption
    ),
    emoteCategory: params.getValue<EmoteCategory>(
      'emoteCategory',
      EmoteCategory
    ),
    emoteGenders: params.getList<GenderFilterOption>(
      'emoteGender',
      GenderFilterOption
    ),
    emotePlayMode: params.getList<EmotePlayMode>(
      'emotePlayMode',
      EmotePlayMode
    ),
    contractAddresses: params.getList('contractAddress'),
    itemId: params.getString('itemId'),
    network: params.getValue<Network>('network', Network),
    maxPrice: maxPrice
      ? ethers.utils.parseEther(maxPrice).toString()
      : undefined,
    minPrice: minPrice
      ? ethers.utils.parseEther(minPrice).toString()
      : undefined,
    urns: params.getList('urn'),
  }
}
