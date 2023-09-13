import etag from 'etag'
import {
  WearableCategory,
  GenderFilterOption,
  EmoteCategory,
  EmotePlayMode,
  Rarity,
  Network,
} from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AssetType, PriceFilterCategory } from '../../ports/prices/types'
import { AppComponents, Context } from '../../types'

const MAX_AGE = 86400 // 1 DAY

export function createPricesHandler(
  components: Pick<AppComponents, 'prices'>
): IHttpServerComponent.IRequestHandler<Context<'/prices'>> {
  const { prices } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const category = params.getString('category') as PriceFilterCategory
    const assetType = params.getString('assetType') as AssetType
    const isWearableHead = params.getBoolean('isWearableHead')
    const isWearableAccessory = params.getBoolean('isWearableAccessory')
    const isWearableSmart = params.getBoolean('isWearableSmart')
    const wearableCategory = params.getValue<WearableCategory>(
      'wearableCategory',
      WearableCategory
    )
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
    const contractAddresses = params.getAddressList('contractAddress')
    const itemRarities = params.getList<Rarity>('itemRarity', Rarity)
    const network = params.getValue<Network>('network', Network)

    const adjacentToRoad = params.getBoolean('adjacentToRoad')
    const minDistanceToPlaza = params.getNumber('minDistanceToPlaza')
    const maxDistanceToPlaza = params.getNumber('maxDistanceToPlaza')
    const maxEstateSize = params.getNumber('maxEstateSize')
    const minEstateSize = params.getNumber('minEstateSize')
    const emoteHasSound = params.getBoolean('emoteHasSound')
    const emoteHasGeometry = params.getBoolean('emoteHasGeometry')

    return asJSON(
      async () => ({
        data: await prices.fetch({
          category,
          assetType,
          isWearableHead,
          isWearableAccessory,
          isWearableSmart,
          wearableCategory,
          wearableGenders,
          emoteCategory,
          emoteGenders,
          emotePlayMode,
          contractAddresses,
          itemRarities,
          network,
          adjacentToRoad,
          minDistanceToPlaza,
          maxDistanceToPlaza,
          maxEstateSize,
          minEstateSize,
          emoteHasGeometry,
          emoteHasSound
        }),
      }),
      {
        'Cache-Control': `public,max-age=${MAX_AGE},s-maxage=${MAX_AGE}`,
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString(),
      },
      (data: any) => {
        const dataString = JSON.stringify(data)
        return {
          ETag: etag(dataString),
          'content-length': dataString.length.toString(),
        }
      }
    )
  }
}
