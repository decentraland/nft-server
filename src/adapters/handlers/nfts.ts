import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { HttpError, json } from '../../logic/http/response'
import {
  NFTCategory,
  NFTSortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../../ports/nfts/types'

export function createNFTsHandler(
  components: Pick<AppComponents, 'logs' | 'nfts'>
): IHttpServerComponent.IRequestHandler<Context<'/nfts'>> {
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
    const itemBlockchainId = params.getString('itemBlockchainId')
    const network = params.getValue<Network>('network', Network)

    return json(() =>
      nfts.fetchAndCount({
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
        itemBlockchainId,
        network,
      })
    )
  }
}

export function createNFTHandler(
  components: Pick<AppComponents, 'logs' | 'nfts'>
): IHttpServerComponent.IRequestHandler<
  Context<'/contracts/:contractAddress/tokens/:tokenId'>
> {
  const { nfts } = components
  return async (context) => {
    const { contractAddress, tokenId } = context.params

    return json(async () => {
      const results = await nfts.fetch({
        contractAddresses: [contractAddress],
        tokenId,
      })

      if (results.length === 0) {
        throw new HttpError('Not Found', 404)
      }

      return results[0]
    })
  }
}
