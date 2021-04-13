import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import {
  NFTCategory,
  Options,
  SortBy,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../ports/nft-source/types'
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
      address: params.getString('address'),
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
      contracts: params.getList('contracts'),
      network: params.getValue<Network>(
        'network',
        Object.values(Network).filter(
          (value) => typeof value === 'string'
        ) as Network[]
      ),
    }
    console.log('-------------')
    console.log(context.url.searchParams.toString())
    console.log(options)
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

export function createCollectionsHandler(
  components: Pick<AppComponents, 'logs' | 'browse'>
): IHttpServerComponent.IRequestHandler<Context<'/collections'>> {
  const { browse } = components
  return async () => {
    try {
      const result = await browse.collections()
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
