import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { BidOptions, BidStatus } from '../ports/bids/types'
import {
  NFTCategory,
  Options,
  SortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../ports/source/types'
import { AppComponents, Context } from '../types'

function buildParams(params: URLSearchParams) {
  return {
    getString(key: string, defaultValue?: string) {
      const value = params.get(key)
      return value === null ? defaultValue : value
    },
    getList<T extends string = string>(key: string, validValues: T[] = []) {
      const list = params.getAll(key) as T[]
      return validValues.length > 0
        ? list.filter((value) => validValues.includes(value))
        : list
    },
    getNumber(key: string, defaultValue?: number) {
      const value = params.get(key)
      if (value !== null) {
        const parsed = parseFloat(value)
        if (!isNaN(parsed)) {
          return parsed
        }
      }
      return defaultValue
    },
    getBoolean(key: string) {
      const value = params.get(key)
      return value !== null
    },
    getValue<T extends string>(
      key: string,
      validValues: T[] = [],
      defaultValue?: T
    ) {
      const value = this.getString(key, defaultValue)
      if (value) {
        if (validValues.length === 0 || validValues.includes(value as T)) {
          return value as T
        }
      }
      return defaultValue
    },
  }
}

export function createBrowseHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<Context<'/browse'>> {
  const { browse } = components

  return async (context) => {
    const params = buildParams(context.url.searchParams)
    const options: Options = {
      first: params.getNumber('first', 100)!,
      skip: params.getNumber('skip', 0)!,
      sortBy: params.getValue<SortBy>('sortBy', Object.values(SortBy)),
      category: params.getValue<NFTCategory>(
        'category',
        Object.values(NFTCategory)
      ),
      address: params.getString('address')?.toLowerCase(),
      isOnSale: params.getBoolean('isOnSale'),
      search: params.getString('search'),
      isLand: params.getBoolean('isLand'),
      isWearableHead: params.getBoolean('isWearableHead'),
      isWearableAccessory: params.getBoolean('isWearableAccessory'),
      wearableCategory: params.getValue<WearableCategory>(
        'wearableCategory',
        Object.values(WearableCategory)
      ),
      wearableRarities: params.getList<WearableRarity>(
        'wearableRarity',
        Object.values(WearableRarity)
      ),
      wearableGenders: params.getList<WearableGender>(
        'wearableGender',
        Object.values(WearableGender)
      ),
      contracts: params
        .getList('contract')
        .map((contract) => contract.toLowerCase()),
      network: params.getValue<Network>(
        'network',
        Object.values(Network).filter(
          (value) => typeof value === 'string'
        ) as Network[]
      ),
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

export function createHistoryHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<
  Context<'/contracts/:contractAddress/tokens/:tokenId/history'>
> {
  const { browse } = components
  return async (context) => {
    const { contractAddress, tokenId } = context.params
    try {
      const history = await browse.getHistory(contractAddress, tokenId)
      return {
        status: 200,
        body: history,
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
  components: Pick<AppComponents, 'logs' | 'bids'>
): IHttpServerComponent.IRequestHandler<Context<'/bids'>> {
  const { bids } = components

  return async (context) => {
    const { searchParams } = context.url
    const bidder = searchParams.get('bidder')
    const seller = searchParams.get('seller')
    const nftId = searchParams.get('nftId')
    const status = searchParams.get('status') as BidStatus | null

    const options: BidOptions = {
      bidder,
      seller,
      nftId,
      status,
    }

    try {
      const result = await bids.fetch(options)
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
