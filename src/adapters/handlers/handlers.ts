import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/params'
import { BidOptions, BidStatus } from '../../ports/bids/types'
import {
  NFTCategory,
  Options,
  SortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../../ports/source/types'
import { AppComponents, Context } from '../../types'

export function createBrowseHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<Context<'/browse'>> {
  const { browse } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const options: Options = {
      first: params.getNumber('first', 100)!,
      skip: params.getNumber('skip', 0)!,
      sortBy: params.getValue<SortBy>('sortBy', SortBy),
      category: params.getValue<NFTCategory>('category', NFTCategory),
      address: params.getString('address')?.toLowerCase(),
      isOnSale: params.getBoolean('isOnSale'),
      search: params.getString('search'),
      isLand: params.getBoolean('isLand'),
      isWearableHead: params.getBoolean('isWearableHead'),
      isWearableAccessory: params.getBoolean('isWearableAccessory'),
      wearableCategory: params.getValue<WearableCategory>(
        'wearableCategory',
        WearableCategory
      ),
      wearableRarities: params.getList<WearableRarity>(
        'wearableRarity',
        WearableRarity
      ),
      wearableGenders: params.getList<WearableGender>(
        'wearableGender',
        WearableGender
      ),
      contracts: params.getAddressList('contract'),
      network: params.getValue<Network>('network', Network),
    }

    try {
      const results = await browse.fetch(options)
      return {
        status: 200,
        body: results,
      }
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

export function createContractsHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<Context<'/contracts'>> {
  const { browse } = components
  return async () => {
    try {
      const result = await browse.getContracts()
      return {
        status: 200,
        body: result,
      }
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

export function createNFTHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<
  Context<'/contracts/:contractAddress/tokens/:tokenId'>
> {
  const { browse } = components
  return async (context) => {
    const { contractAddress, tokenId } = context.params
    try {
      const result = await browse.getNFT(contractAddress, tokenId)
      return result !== null
        ? {
            status: 200,
            body: result,
          }
        : {
            status: 404,
            body: 'Not found',
          }
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

export function createBidsHandler(
  components: Pick<AppComponents, 'logs' | 'marketplaceBids'>
): IHttpServerComponent.IRequestHandler<Context<'/bids'>> {
  const { marketplaceBids } = components

  return async (context) => {
    const { searchParams } = context.url
    const bidder = searchParams.get('bidder')
    const seller = searchParams.get('seller')
    const contractAddress = searchParams.get('contractAddress')
    const tokenId = searchParams.get('tokenId')
    const status = searchParams.get('status') as BidStatus | null

    const options: BidOptions = {
      bidder,
      seller,
      contractAddress,
      tokenId,
      status,
    }

    try {
      const result = await marketplaceBids.fetch(options)
      return {
        status: 200,
        body: result,
      }
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}
