import { gql } from 'apollo-boost'
import { Network } from '@dcl/schemas'
import {
  SourceResult,
  SortBy,
  EnsData,
  NFT,
  WearableData,
  NFTCategory,
  OrderStatus,
  Collection,
} from '../../nft-source/types'
import { fromNumber, fromWei } from '../../nft-source/utils'
import { isExpired } from '../utils'

export type MarketplaceOrderFields = {
  id: string
  category: NFTCategory
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: string
  createdAt: string
  updatedAt: string
}
export const getMarketplaceOrderFields = () => gql`
  fragment marketplaceOrderFields on Order {
    id
    category
    nftAddress
    owner
    buyer
    price
    status
    expiresAt
    createdAt
    updatedAt
  }
`

export type MarketplaceOrderFragment = MarketplaceOrderFields
export const getMarketplaceOrderFragment = () => gql`
  fragment marketplaceOrderFragment on Order {
    ...marketplaceOrderFields
  }
  ${getMarketplaceOrderFields()}
`

export const getMarketplaceFields = () => gql`
  fragment marketplaceFields on NFT {
    id
    name
    image
    contractAddress
    tokenId
    category
    owner {
      address
    }
    parcel {
      x
      y
      data {
        description
      }
    }
    estate {
      size
      parcels {
        x
        y
      }
      data {
        description
      }
    }
    wearable {
      description
      category
      rarity
      bodyShapes
    }
    ens {
      subdomain
    }
    createdAt
    searchOrderPrice
    searchOrderCreatedAt
  }
`

export const getMarketplaceFragment = () => gql`
  fragment marketplaceFragment on NFT {
    ...marketplaceFields
    activeOrder {
      ...marketplaceOrderFields
    }
  }
  ${getMarketplaceFields()}
  ${getMarketplaceOrderFields()}
`

export type MarketplaceFields = Omit<
  NFT,
  'activeOrderId' | 'owner' | 'data'
> & {
  owner: { address: string }
  parcel?: {
    x: string
    y: string
    data: {
      description: string
    } | null
  }
  estate?: {
    size: number
    parcels: { x: number; y: number }[]
    data: {
      description: string
    } | null
  }
  wearable?: WearableData
  ens?: EnsData
  createdAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
}

export type MarketplaceFragment = MarketplaceFields & {
  activeOrder: MarketplaceOrderFields | null
}

export function getMarketplaceOrderBy(
  sortBy?: SortBy
): keyof MarketplaceFragment {
  switch (sortBy) {
    case SortBy.NEWEST:
      return 'createdAt'
    case SortBy.NAME:
      return 'name'
    case SortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case SortBy.CHEAPEST:
      return 'searchOrderPrice'
    default:
      return getMarketplaceOrderBy(SortBy.NEWEST)
  }
}

export function fromMarketplaceFragment(
  fragment: MarketplaceFragment
): SourceResult {
  const result: SourceResult = {
    nft: {
      id: fragment.id,
      tokenId: fragment.tokenId,
      contractAddress: fragment.contractAddress,
      activeOrderId:
        fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
          ? fragment.activeOrder.id
          : null,
      owner: fragment.owner.address.toLowerCase(),
      name: fragment.name,
      image: fragment.image,
      url: `/contracts/${fragment.contractAddress}/tokens/${fragment.tokenId}`,
      data: {
        parcel: fragment.parcel
          ? {
              description:
                (fragment.parcel.data && fragment.parcel.data.description) ||
                null,
              x: fragment.parcel.x,
              y: fragment.parcel.y,
            }
          : undefined,
        estate: fragment.estate
          ? {
              description:
                (fragment.estate.data && fragment.estate.data.description) ||
                null,
              size: fragment.estate.size,
              parcels: fragment.estate.parcels.map(({ x, y }) => ({ x, y })),
            }
          : undefined,
        wearable: fragment.wearable
          ? {
              bodyShapes: fragment.wearable.bodyShapes,
              category: fragment.wearable.category,
              description: fragment.wearable.description,
              rarity: fragment.wearable.rarity,
            }
          : undefined,
        ens: fragment.ens ? { subdomain: fragment.ens.subdomain } : undefined,
      },
      category: fragment.category,
      network: Network.ETHEREUM,
    },
    order:
      fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
        ? {
            id: fragment.activeOrder.id,
            nftId: fragment.id,
            nftAddress: fragment.activeOrder.nftAddress,
            category: fragment.activeOrder.category,
            owner: fragment.activeOrder.owner,
            buyer: fragment.activeOrder.buyer,
            price: fragment.activeOrder.price,
            status: fragment.activeOrder.status,
            expiresAt: +fragment.activeOrder.expiresAt,
            createdAt: +fragment.activeOrder.createdAt * 1000,
            updatedAt: +fragment.activeOrder.updatedAt * 1000,
          }
        : null,
    sort: {
      [SortBy.NEWEST]: fromNumber(fragment.createdAt),
      [SortBy.NAME]: fragment.name,
      [SortBy.RECENTLY_LISTED]: fromNumber(fragment.searchOrderCreatedAt),
      [SortBy.CHEAPEST]: fromWei(fragment.searchOrderPrice),
    },
  }

  // remove undefined data
  for (const property of Object.keys(result.nft.data)) {
    const key = property as keyof typeof result.nft.data
    if (!result.nft.data[key]) {
      delete result.nft.data[key]
    }
  }

  return result
}

export async function getLegacyCollections() {
  const collections: Collection[] = [
    {
      name: 'Atari Launch',
      address: '0x4c290f486bae507719c562b6b524bdb71a2570c9',
      network: Network.ETHEREUM,
    },
    {
      name: 'Binance Us',
      address: '0xa8ee490e4c4da48cc1653502c1a77479d4d818de',
      network: Network.ETHEREUM,
    },
    {
      name: 'China Flying',
      address: '0x90958d4531258ca11d18396d4174a007edbc2b42',
      network: Network.ETHEREUM,
    },
    {
      name: 'Community Contest',
      address: '0x32b7495895264ac9d0b12d32afd435453458b1c6',
      network: Network.ETHEREUM,
    },
    {
      name: 'Cybermike CyberSoldier Set',
      address: '0x24d538a6265b006d4b53c45ba91af5ef60dca6cb',
      network: Network.ETHEREUM,
    },
    {
      name: 'CZ Mercenary MTZ',
      address: '0xc3ca6c364b854fd0a653a43f8344f8c22ddfdd26',
      network: Network.ETHEREUM,
    },
    {
      name: 'Dappcraft Moonminer',
      address: '0x1e1d4e6262787c8a8783a37fee698bd42aa42bec',
      network: Network.ETHEREUM,
    },
    {
      name: 'DCG',
      address: '0x3163d2cfee3183f9874e2869942cc62649eeb004',
      network: Network.ETHEREUM,
    },
    {
      name: 'DCL Launch',
      address: '0xd35147be6401dcb20811f2104c33de8e97ed6818',
      network: Network.ETHEREUM,
    },
    {
      name: 'DC Meta',
      address: '0xe7a64f6a239ed7f5bf18caa1ce2920d0c1278129',
      network: Network.ETHEREUM,
    },
    {
      name: 'DC Niftyblocksmith',
      address: '0x102daabd1e9d294d4436ec4c521dce7b1f15499e',
      network: Network.ETHEREUM,
    },
    {
      name: 'DG Fall 2020',
      address: '0x7038e9d2c6f5f84469a84cf9bc5f4909bb6ac5e0',
      network: Network.ETHEREUM,
    },
    {
      name: 'DG Summer',
      address: '0xbf53c33235cbfc22cef5a61a83484b86342679c5',
      network: Network.ETHEREUM,
    },
    {
      name: 'Dgtble Headspace',
      address: '0x574f64ac2e7215cba9752b85fc73030f35166bc0',
      network: Network.ETHEREUM,
    },
    {
      name: 'Digital Alchemy',
      address: '0x5cf39e64392c615fd8086838883958752a11b486',
      network: Network.ETHEREUM,
    },
    {
      name: 'Ethermon Wearables',
      address: '0x54266bcf2ffa841af934f003d144957d5934f3ab',
      network: Network.ETHEREUM,
    },
    {
      name: 'Exclusive Masks',
      address: '0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd',
      network: Network.ETHEREUM,
    },
    {
      name: 'Halloween2019',
      address: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
      network: Network.ETHEREUM,
    },
    {
      name: 'Halloween2020',
      address: '0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907',
      network: Network.ETHEREUM,
    },
    {
      name: 'MCH',
      address: '0xf64dc33a192e056bb5f0e5049356a0498b502d50',
      network: Network.ETHEREUM,
    },
    {
      name: "Meme don't buy this",
      address: '0x1a57f6afc902d25792c53b8f19b7e17ef84222d5',
      network: Network.ETHEREUM,
    },
    {
      name: 'MF Sammichgamer',
      address: '0x30d3387ff3de2a21bef7032f82d00ff7739e403c',
      network: Network.ETHEREUM,
    },
    {
      name: 'ML Liondance',
      address: '0x0b1c6c75d511fae05e7dc696f4cf14129a9c43c9',
      network: Network.ETHEREUM,
    },
    {
      name: 'ML Pekingopera',
      address: '0x60d8271c501501c4b8cd9ed5343ac59d1b79d993',
      network: Network.ETHEREUM,
    },
    {
      name: 'Moonshot',
      address: '0x6a99abebb48819d2abe92c5e4dc4f48dc09a3ee8',
      network: Network.ETHEREUM,
    },
    {
      name: 'PM Dreamverse Eminence',
      address: '0x09305998a531fade369ebe30adf868c96a34e813',
      network: Network.ETHEREUM,
    },
    {
      name: 'PM Outtathisworld',
      address: '0x75a3752579dc2d63ca229eebbe3537fbabf85a12',
      network: Network.ETHEREUM,
    },
    {
      name: 'RAC Basics',
      address: '0x68e139552c4077ce5c9ab929c7e18ca721ffff00',
      network: Network.ETHEREUM,
    },
    {
      name: 'Release the Kraken',
      address: '0xffc5043d9a00865d089d5eefa5b3d1625aec6763',
      network: Network.ETHEREUM,
    },
    {
      name: 'RTFKT X Atari',
      address: '0x6b47e7066c7db71aa04a1d5872496fe05c4c331f',
      network: Network.ETHEREUM,
    },
    {
      name: 'Stay Safe',
      address: '0x201c3af8c471e5842428b74d1e7c0249adda2a92',
      network: Network.ETHEREUM,
    },
    {
      name: 'Sugarclub Yumi',
      address: '0xb5d14052d1e2bce2a2d7459d0379256e632b855d',
      network: Network.ETHEREUM,
    },
    {
      name: 'Tech Tribal Marc0matic',
      address: '0x480a0f4e360e8964e68858dd231c2922f1df45ef',
      network: Network.ETHEREUM,
    },
    {
      name: '3LAUBasics',
      address: '0xe1ecb4e5130f493551c7d6df96ad19e5b431a0a9',
      network: Network.ETHEREUM,
    },
    {
      name: 'Winklevoss Capital',
      address: '0xc82a864a94db3550bc71fcb4ce07228bcec21f1a',
      network: Network.ETHEREUM,
    },
    {
      name: 'Wonderzone Meteorcharser',
      address: '0x34ed0aa248f60f54dd32fbc9883d6137a491f4f3',
      network: Network.ETHEREUM,
    },
    {
      name: 'Wonderzone Steampunk',
      address: '0xb96697fa4a3361ba35b774a42c58daccaad1b8e1',
      network: Network.ETHEREUM,
    },
    {
      name: 'WZ Wonderbot',
      address: '0x5df4602e7f38a91ea7724fc167f0c67f61604b1e',
      network: Network.ETHEREUM,
    },
    {
      name: 'Xmas2019',
      address: '0xc3af02c0fd486c8e9da5788b915d6fff3f049866',
      network: Network.ETHEREUM,
    },
    {
      name: 'Xmas2020',
      address: '0xecf073f91101ce5628669c487aee8f5822a101b1',
      network: Network.ETHEREUM,
    },
    {
      name: 'XmashUp',
      address: '0xdd9c7bc159dacb19c9f6b9d7e23948c87aa2397f',
      network: Network.ETHEREUM,
    },
  ]

  return collections
}
