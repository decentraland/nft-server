import {
  BodyShape,
  EmoteCategory,
  NFTCategory,
  NFTFilters,
  Rarity,
} from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  getMarketplaceFragment,
  fromMarketplaceNFTFragment,
  getMarketplaceOrderBy,
  getMarketplaceExtraVariables,
  getMarketplaceExtraWhere,
  MarketplaceNFTFragment,
} from '../../../src/logic/nfts/marketplace'
import {
  getCollectionsFragment,
  fromCollectionsFragment,
  getCollectionsOrderBy,
  getCollectionsExtraWhere,
  getCollectionsExtraVariables,
  CollectionsFragment,
} from '../../../src/logic/nfts/collections'
import { createNFTComponent } from '../../../src/ports/nfts/component'
import { INFTsComponent } from '../../ports/nfts/types'
import { FragmentItemType } from '../../ports/items/types'
import { getFetchQuery, getQueryVariables } from '../../ports/nfts/utils'

let marketplaceSubgraphMock: ISubgraphComponent
let collectionSubgraphMock: ISubgraphComponent
let queryMock: jest.Mock
let marketplaceNFTsMock: INFTsComponent
let collectionsNFTsMock: INFTsComponent

let dateNowSpy: jest.SpyInstance
const expiresAt = Date.now()

const collectionsFragment = 'collectionsFragment'

beforeEach(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => expiresAt)
  queryMock = jest.fn()
  marketplaceSubgraphMock = {
    query: queryMock,
  }
  collectionSubgraphMock = {
    query: queryMock,
  }

  marketplaceNFTsMock = createNFTComponent({
    subgraph: marketplaceSubgraphMock,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceNFTFragment,
    getSortByProp: getMarketplaceOrderBy,
    getExtraVariables: getMarketplaceExtraVariables,
    getExtraWhere: getMarketplaceExtraWhere,
  })

  collectionsNFTsMock = createNFTComponent({
    subgraph: collectionSubgraphMock,
    fragmentName: collectionsFragment,
    getFragment: getCollectionsFragment,
    fromFragment: fromCollectionsFragment,
    getSortByProp: getCollectionsOrderBy,
    getExtraWhere: getCollectionsExtraWhere,
    getExtraVariables: getCollectionsExtraVariables,
  })
})

afterEach(() => {
  dateNowSpy.mockRestore()
  queryMock.mockRestore()
})

describe('when fetching tokens by ids', () => {
  let tokenIds: string[] = ['1', '2', '3']

  describe('and the request fails', () => {
    beforeEach(() => {
      queryMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should propagate the error', () => {
      return expect(
        marketplaceNFTsMock.fetchByTokenIds(tokenIds)
      ).rejects.toThrowError('An error occurred')
    })
  })

  describe('and the request is successful', () => {
    let nftFragments: MarketplaceNFTFragment[]

    beforeEach(() => {
      nftFragments = Array.from({ length: 4 }, (_, i) => ({
        id: `contractAddress-${i.toString()}-tokenId-${i.toString()}`,
        name: `name-${i}`,
        image: null,
        contractAddress: `contractAddress-${i}`,
        tokenId: `tokenId-${i}`,
        category: NFTCategory.PARCEL,
        owner: {
          address: '0x0',
        },
        parcel: {
          x: '1',
          y: i.toString(),
          data: null,
          estate: null,
        },
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        soldAt: Date.now().toString(),
        searchOrderPrice: '10000',
        searchOrderCreatedAt: 'Date.now().toString()',
        activeOrder: null,
      }))

      queryMock.mockResolvedValueOnce({ nfts: nftFragments })
    })

    it('should return the converted fragment of nfts', () => {
      return expect(
        marketplaceNFTsMock.fetchByTokenIds(tokenIds)
      ).resolves.toEqual(nftFragments.map(fromMarketplaceNFTFragment))
    })
  })
})

describe('when fetching emotes', () => {
  let nftFragments: CollectionsFragment[]
  let filters: NFTFilters = {
    category: NFTCategory.EMOTE,
  }

  beforeEach(() => {
    const contractAddress = `0x0`
    nftFragments = Array.from({ length: 2 }, (_, i) => ({
      id: `${contractAddress}-${i}`,
      itemType: FragmentItemType.EMOTE_V1,
      image: `https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:${contractAddress}:${i}/thumbnail`,
      contractAddress,
      tokenId: i.toString(),
      owner: { address: '0x0' },
      metadata: {
        wearable: null,
        emote: {
          name: 'emote',
          description: '',
          category: EmoteCategory.DANCE,
          rarity: Rarity.COMMON,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
        },
      },
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      soldAt: '',
      searchOrderPrice: null,
      searchOrderCreatedAt: null,
      itemBlockchainId: i.toString(),
      issuedId: i.toString(),
      activeOrder: null,
      openRentalId: null,
    }))
  })

  describe('and fetching by rarities', () => {
    describe('and the rarity is common', () => {
      describe('and the request is successful', () => {
        beforeEach(() => {
          filters = {
            ...filters,
            itemRarities: [Rarity.COMMON],
          }
          queryMock.mockResolvedValueOnce({ nfts: nftFragments })
        })

        it('should return the converted fragment of nfts', async () => {
          const fetchQuery = getFetchQuery(
            filters,
            collectionsFragment,
            getCollectionsFragment,
            getCollectionsExtraVariables,
            getCollectionsExtraWhere
          )
          const variableQuery = getQueryVariables(
            filters,
            getCollectionsOrderBy
          )
          expect(collectionsNFTsMock.fetch(filters)).resolves.toEqual(
            nftFragments.map(fromCollectionsFragment)
          )
          return expect(queryMock).toBeCalledWith(fetchQuery, variableQuery)
        })
      })
    })

    describe('and the rarity is legendary', () => {
      describe('and the request is successful', () => {
        beforeEach(() => {
          filters = {
            ...filters,
            itemRarities: [Rarity.LEGENDARY],
          }
          queryMock.mockResolvedValueOnce({ nfts: nftFragments })
        })

        it('should return the converted fragment of nfts', () => {
          const fetchQuery = getFetchQuery(
            filters,
            collectionsFragment,
            getCollectionsFragment,
            getCollectionsExtraVariables,
            getCollectionsExtraWhere
          )
          const variableQuery = getQueryVariables(
            filters,
            getCollectionsOrderBy
          )
          expect(collectionsNFTsMock.fetch(filters)).resolves.toEqual(
            nftFragments.map(fromCollectionsFragment)
          )
          return expect(queryMock).toBeCalledWith(fetchQuery, variableQuery)
        })
      })
    })
  })
})
