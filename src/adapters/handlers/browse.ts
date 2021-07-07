import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { json } from '../../logic/http/response'
import {
  NFT,
  NFTCategory,
  NFTOptions,
  NFTSortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../../ports/nfts/types'
import { Order } from '../../ports/orders/types'

export function createBrowseHandler(
  components: Pick<AppComponents, 'logs' | 'nfts'>
): IHttpServerComponent.IRequestHandler<Context<'/browse'>> {
  const { nfts } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<NFTSortBy>('sortBy', NFTSortBy)
    const category = params.getValue<NFTCategory>('category', NFTCategory)
    const owner = params.getAddress('owner')
    const isOnSale = params.getBoolean('isOnSale')
    const search = params.getString('search')
    const isLand = params.getBoolean('isLand')
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
    const tokenId = params.getString('tokenId')
    const network = params.getValue<Network>('network', Network)

    const options: NFTOptions = {
      first,
      skip,
      sortBy,
      category,
      owner,
      isOnSale,
      search,
      isLand,
      isWearableHead,
      isWearableAccessory,
      wearableCategory,
      wearableRarities,
      wearableGenders,
      contractAddresses,
      tokenId,
      network,
    }

    return json(async () => {
      const [nftResults, total] = await Promise.all([
        nfts.fetch(options),
        nfts.count(options),
      ])

      const result: { nfts: NFT[]; orders: Order[]; total: number } = {
        nfts: [],
        orders: [],
        total: Math.min(1000, total),
      }

      for (const nftResult of nftResults) {
        result.nfts.push(nftResult.nft)
        if (nftResult.order) {
          result.orders.push(nftResult.order)
        }
      }

      return result
    })
  }
}
