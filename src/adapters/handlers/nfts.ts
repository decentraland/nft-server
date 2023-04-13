import { ethers } from 'ethers'
import {
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  Network,
  NFTCategory,
  NFTSortBy,
  Rarity,
  RentalStatus,
  WearableCategory,
} from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { HttpError, asJSON } from '../../logic/http/response'

export function createNFTsHandler(
  components: Pick<AppComponents, 'nfts'>
): IHttpServerComponent.IRequestHandler<Context<'/nfts'>> {
  const { nfts } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<NFTSortBy>('sortBy', NFTSortBy)
    const category = params.getValue<NFTCategory>('category', NFTCategory)
    const owner = params.getAddress('owner')
    const tenant = params.getAddress('tenant')?.toLowerCase()
    const isOnSale = params.getString('isOnSale') === 'true'
    const search = params.getString('search')
    const isLand = params.getBoolean('isLand')
    const isOnRent = params.getBoolean('isOnRent')
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
    const tokenId = params.getString('tokenId')
    const itemRarities = params.getList<Rarity>('itemRarity', Rarity)
    const itemId = params.getString('itemId')
    const network = params.getValue<Network>('network', Network)
    const rentalStatus = params.getList<RentalStatus>(
      'rentalStatus',
      RentalStatus
    )
    const creator = params.getList('creator')
    const maxPrice = params.getString('maxPrice')
    const minPrice = params.getString('minPrice')
    const adjacentToRoad = params.getBoolean('adjacentToRoad')
    const minDistanceToPlaza = params.getNumber('minDistanceToPlaza')
    const maxDistanceToPlaza = params.getNumber('maxDistanceToPlaza')
    const maxEstateSize = params.getNumber('maxEstateSize')
    const minEstateSize = params.getNumber('minEstateSize')
    const rentalDays = params
      .getList('rentalDays')
      .map((days) => Number.parseInt(days))
      .filter((number) => !Number.isNaN(number))

    return asJSON(() => {
      if (owner && tenant) {
        throw new HttpError('Owner or tenant can be set, but not both.', 400)
      }

      if (tokenId && !tokenId.match(`^[0-9]+$`)) {
        throw new HttpError('Invalid token id, token ids must be numbers', 400)
      }

      if (tokenId && contractAddresses.length === 0) {
        throw new HttpError(
          "NFTs can't be queried by token id if no contract address is provided",
          400
        )
      }

      return nfts.fetchAndCount({
        first,
        skip,
        sortBy,
        category,
        owner,
        isOnSale,
        isOnRent,
        search,
        isLand,
        isWearableHead,
        isWearableAccessory,
        isWearableSmart,
        wearableCategory,
        wearableGenders,
        emoteCategory,
        emoteGenders,
        emotePlayMode,
        contractAddresses,
        creator,
        tokenId,
        itemRarities,
        itemId,
        network,
        rentalStatus,
        adjacentToRoad,
        minDistanceToPlaza,
        maxDistanceToPlaza,
        tenant,
        maxPrice: maxPrice
          ? ethers.utils.parseEther(maxPrice).toString()
          : undefined,
        minPrice: minPrice
          ? ethers.utils.parseEther(minPrice).toString()
          : undefined,
        minEstateSize,
        maxEstateSize,
        rentalDays,
      })
    })
  }
}

export function createNFTHandler(
  components: Pick<AppComponents, 'nfts'>
): IHttpServerComponent.IRequestHandler<
  Context<'/contracts/:contractAddress/tokens/:tokenId'>
> {
  const { nfts } = components
  return async (context) => {
    const { contractAddress, tokenId } = context.params
    const queryParameters = new Params(context.url.searchParams)
    const rentalStatus = queryParameters.getList<RentalStatus>(
      'rentalStatus',
      RentalStatus
    )
    return asJSON(async () => {
      const results = await nfts.fetch({
        contractAddresses: [contractAddress],
        tokenId,
        rentalStatus,
      })

      if (results.length === 0) {
        throw new HttpError('Not Found', 404)
      }

      return results[0]
    })
  }
}
