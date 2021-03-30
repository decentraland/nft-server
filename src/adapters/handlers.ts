import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import {
  NFTCategory,
  NFTOptions,
  SortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../ports/nft/types'
import { AppComponents, Context } from '../types'

function buildParams(params: URLSearchParams) {
  return {
    getString(key: string, defaultValue?: string) {
      const value = params.get(key)
      return value === null ? defaultValue : value
    },
    getList<T extends string = string>(key: string) {
      return params.getAll(key) as T[]
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
    getValue<T extends string>(key: string, defaultValue?: T) {
      const value = this.getString(key, defaultValue)
      if (value) {
        return value as T
      }
      return defaultValue
    },
  }
}

export function createBrowseHandler(
  components: Pick<AppComponents, 'logs' | 'nft'>
): IHttpServerComponent.IRequestHandler<Context<'/browse'>> {
  const { nft } = components

  return async (context) => {
    const params = buildParams(context.url.searchParams)
    const options: NFTOptions = {
      first: params.getNumber('first', 100)!,
      skip: params.getNumber('skip', 0)!,
      sortBy: params.getValue<SortBy>('sortBy'),
      category: params.getValue<NFTCategory>('category'),
      address: params.getString('address'),
      isOnSale: params.getBoolean('isOnSale'),
      search: params.getString('search'),
      isLand: params.getBoolean('isLand'),
      isWearableHead: params.getBoolean('isWearableHead'),
      isWearableAccessory: params.getBoolean('isWearableAccessory'),
      wearableCategory: params.getValue<WearableCategory>('wearableCategory'),
      wearableRarities: params.getList<WearableRarity>('wearableRarity'),
      wearableGenders: params.getList<WearableGender>('wearableGender'),
      contracts: params.getList('contracts'),
      network: params.getValue<Network>('network'),
    }

    const nfts = await nft.fetch(options)
    return {
      status: 200,
      body: nfts,
    }
  }
}
