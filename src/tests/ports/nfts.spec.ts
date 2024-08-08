import * as nodeFetch from 'node-fetch'
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
import { IBuilderComponent } from '../../ports/builder'

jest.mock('node-fetch')

let marketplaceSubgraphMock: ISubgraphComponent
let collectionSubgraphMock: ISubgraphComponent
let queryMock: jest.Mock
let marketplaceNFTsMock: INFTsComponent
let collectionsNFTsMock: INFTsComponent
let builderMock: IBuilderComponent
let getItemUtilityMock: jest.Mock

let dateNowSpy: jest.SpyInstance
const expiresAt = Date.now()

const collectionsFragment = 'collectionsFragment'

beforeEach(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => expiresAt)
  queryMock = jest.fn()
  getItemUtilityMock = jest.fn()
  marketplaceSubgraphMock = {
    query: queryMock,
  }
  collectionSubgraphMock = {
    query: queryMock,
  }
  builderMock = {
    getItemUtility: getItemUtilityMock,
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
    builder: builderMock,
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
      ).resolves.toEqual(nftFragments.map((f) => fromMarketplaceNFTFragment(f)))
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
          loop: false,
          hasGeometry: false,
          hasSound: false,
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
      urn: `urn:decentraland:mumbai:collections-v2:${contractAddress}:${i}`,
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
          const variableQuery = getQueryVariables(
            filters,
            getCollectionsOrderBy
          )
          const fetchQuery = getFetchQuery(
            variableQuery,
            collectionsFragment,
            getCollectionsFragment,
            getCollectionsExtraVariables,
            getCollectionsExtraWhere
          )
          expect(collectionsNFTsMock.fetch(filters)).resolves.toEqual(
            nftFragments.map((f) => fromCollectionsFragment(f))
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
          const variableQuery = getQueryVariables(
            filters,
            getCollectionsOrderBy
          )
          const fetchQuery = getFetchQuery(
            variableQuery,
            collectionsFragment,
            getCollectionsFragment,
            getCollectionsExtraVariables,
            getCollectionsExtraWhere
          )
          expect(collectionsNFTsMock.fetch(filters)).resolves.toEqual(
            nftFragments.map((f) => fromCollectionsFragment(f))
          )
          return expect(queryMock).toBeCalledWith(fetchQuery, variableQuery)
        })
      })
    })
  })
})

describe('when fetching nfts', () => {
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
          loop: false,
          hasGeometry: false,
          hasSound: false,
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
      urn: `urn:decentraland:mumbai:collections-v2:${contractAddress}:${i}`,
    }))
  })

  describe('and fetching ENS', () => {
    let bannedNames: string[]
    beforeEach(() => {
      bannedNames = ['bannedName1', 'bannedName1']
      const mockedResponse = {
        json: async () => ({
          data: bannedNames,
        }),
      }

      ;(nodeFetch as unknown as jest.Mock).mockResolvedValue(mockedResponse)

      filters = {
        ...filters,
        category: NFTCategory.ENS,
      }
      queryMock.mockResolvedValue({ nfts: nftFragments })
    })

    it('should fetch the banned names and filter the query based on them', async () => {
      const variableQuery = getQueryVariables(filters, getCollectionsOrderBy)
      const fetchQuery = getFetchQuery(
        variableQuery,
        collectionsFragment,
        getCollectionsFragment,
        getCollectionsExtraVariables,
        getCollectionsExtraWhere,
        false,
        bannedNames
      )
      const result = await collectionsNFTsMock.fetch(filters)
      expect(result).toEqual(
        nftFragments.map((f) => fromCollectionsFragment(f))
      )
      expect(nodeFetch).toHaveBeenCalled()
      return expect(queryMock).toBeCalledWith(fetchQuery, variableQuery)
    })
  })
})

describe('when fetching one NFT', () => {
  const contractAddress = '0x0'
  const tokenId = 'someTokenId'
  const itemBlockchainId = '1'

  describe('and the query request fails', () => {
    beforeEach(() => {
      queryMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should propagate the error', () => {
      return expect(
        collectionsNFTsMock.fetchOne(contractAddress, tokenId)
      ).rejects.toThrowError('An error occurred')
    })
  })

  describe('and the query request is successful', () => {
    let data: { nfts: CollectionsFragment[] }

    beforeEach(() => {
      data = { nfts: [] }
      queryMock.mockResolvedValueOnce(data)
    })

    describe('and no nfts were found', () => {
      beforeEach(() => {
        data.nfts = []
      })

      it('should resolve to null without requesting the item utility', async () => {
        expect(
          await collectionsNFTsMock.fetchOne(contractAddress, tokenId)
        ).toBeNull()
        expect(getItemUtilityMock).not.toHaveBeenCalled()
      })
    })

    describe('and one nft is found', () => {
      let nftFragment: CollectionsFragment
      let utility: string

      beforeEach(() => {
        utility = 'This is a utility'
        nftFragment = {
          id: '1',
          itemType: FragmentItemType.EMOTE_V1,
          image: '',
          contractAddress,
          tokenId,
          owner: { address: '0x0' },
          metadata: {
            wearable: null,
            emote: {
              name: 'emote',
              description: '',
              category: EmoteCategory.DANCE,
              rarity: Rarity.COMMON,
              bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
              loop: false,
              hasGeometry: false,
              hasSound: false,
            },
          },
          createdAt: '0',
          updatedAt: '0',
          soldAt: '',
          searchOrderPrice: null,
          searchOrderCreatedAt: null,
          itemBlockchainId,
          issuedId: 'anIssueId',
          activeOrder: null,
          openRentalId: null,
          urn: '',
        }
        ;(data.nfts = [nftFragment]),
          getItemUtilityMock.mockResolvedValue(utility)
      })

      it('should resolve with the nft having the item utility', async () => {
        const nftResult = fromCollectionsFragment(nftFragment)

        expect(
          await collectionsNFTsMock.fetchOne(contractAddress, tokenId)
        ).toEqual({ ...nftResult, nft: { ...nftResult.nft, utility } })
      })
    })
  })
})
