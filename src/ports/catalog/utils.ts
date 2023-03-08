import {
  BodyShape,
  EmoteCategory,
  NFT,
  NFTCategory,
  Network,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import {
  GetCatalogQuery,
  getLegacyNFTsCatalogQuery,
  LegacyNFTFieldsFragment,
  ItemFieldsFragment,
  ItemType,
  Item_orderBy,
} from '../../../.graphclient'
import { CatalogItem, CatalogSortyBy } from './types'

function getDataFromFragment(fragment: ItemFieldsFragment) {
  let name: string
  let category: NFTCategory
  let data: CatalogItem['data']
  switch (fragment.itemType) {
    case 'wearable_v1':
    case 'wearable_v2':
    case 'smart_wearable_v1': {
      name = fragment.metadata?.wearable!.name || ''
      category = NFTCategory.WEARABLE
      data = {
        wearable: {
          bodyShapes: fragment.metadata!.wearable!
            .bodyShapes as unknown as BodyShape[],
          category: fragment.metadata!.wearable!.category as WearableCategory,
          description: fragment.metadata!.wearable!.description,
          rarity: fragment.metadata!.wearable!.rarity as Rarity,
          isSmart: fragment.itemType === 'smart_wearable_v1',
        },
      }
      break
    }
    case 'emote_v1': {
      name = fragment.metadata!.emote!.name
      category = NFTCategory.EMOTE
      data = {
        emote: {
          bodyShapes: fragment.metadata!.emote!
            .bodyShapes as unknown as BodyShape[],
          category: fragment.metadata!.emote!.category as EmoteCategory,
          description: fragment.metadata!.emote!.description,
          rarity: fragment.metadata!.emote!.rarity as Rarity,
          loop: fragment.metadata!.emote!.loop,
        },
      }
      break
    }
    default: {
      throw new Error(`Uknown itemType=${fragment.itemType}`)
    }
  }
  return { name, category, data }
}

export function fromQueryToCatalogItems(data: GetCatalogQuery): CatalogItem[] {
  return data.items.map((fragment) => {
    delete fragment['nfts']
    const { data, name, category } = getDataFromFragment(fragment)
    const orders = fragment.nfts
      ?.map((nft) => nft.orders)
      .flat()
      .map((order) => order?.price)
    const orderMax = orders ? Math.max(...orders) : 0
    const orderMin = orders ? Math.min(...orders) : 0
    return {
      ...fragment,
      network: Network.MATIC,
      name,
      category,
      creator: fragment.collection.creator,
      listings: {
        // amount: orders ? orders?.length : 0,
        // max: orderMax,
        // min: orderMin,
        amount: 0,
        max: 1,
        min: 2,
        // amount: fragment.nftOrderPrices.length,
        // max: fragment.maxNftOrder,
        // min: fragment.minNftOrder,
      },
      data,
    }
  })
}

function fromLegacyNFTToCatalogItem(
  legacyNFTs: LegacyNFTFieldsFragment[]
): CatalogItem {
  const baseNFTData = legacyNFTs[0]
  const orders: number[] = legacyNFTs.map((nft) => nft.orders?.[0].price)

  return {
    ...baseNFTData,
    available: 0,
    name: baseNFTData.name!,
    creator: null,
    price: baseNFTData.orders?.[0]?.price || '',
    network: Network.ETHEREUM,
    data: {
      wearable: {
        bodyShapes: baseNFTData.wearable!.bodyShapes as unknown as BodyShape[],
        category: baseNFTData.wearable!.category as WearableCategory,
        description: baseNFTData.wearable!.description,
        rarity: baseNFTData.wearable!.rarity as Rarity,
        isSmart: false,
      },
    },
    listings: {
      amount: orders.length,
      max: Math.max(...orders),
      min: Math.min(...orders),
    },
  }
}

export function fromQueryResultToCatalogLegacyItems(
  data: getLegacyNFTsCatalogQuery
): CatalogItem[] {
  const mapByNFT = data.legacyNFTs.reduce((acc, fragment) => {
    const key = `${fragment.name}-${fragment.contractAddress}`
    if (!acc[key]) {
      acc[key] = [fragment]
    } else {
      acc[key].push(fragment)
    }
    return acc
  }, {} as Record<string, getLegacyNFTsCatalogQuery['legacyNFTs'][0][]>)

  const catalogItems = Object.values(mapByNFT).map((nfts) => {
    return fromLegacyNFTToCatalogItem(nfts)
  })
  console.log('catalogItems: ', catalogItems)
  return catalogItems
}

export function fromCatalogSortToQuerySort(
  sortBy?: CatalogSortyBy
): Item_orderBy {
  const defaultSort = 'price'
  if (!sortBy) {
    return defaultSort
  }
  switch (sortBy) {
    case CatalogSortyBy.CHEAPEST:
      return 'price'

    default:
      return defaultSort
  }
}
