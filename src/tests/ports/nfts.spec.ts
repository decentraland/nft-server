import { NFTCategory } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  getMarketplaceFragment,
  fromMarketplaceNFTFragment,
  getMarketplaceOrderBy,
  getMarketplaceExtraVariables,
  getMarketplaceExtraWhere,
  MarketplaceNFTFragment,
} from '../../../src/logic/nfts/marketplace'
import { createNFTComponent } from '../../../src/ports/nfts/component'
import { INFTsComponent } from '../../ports/nfts/types'

let marketplaceSubgraphMock: ISubgraphComponent
let queryMock: jest.Mock
let nftComponentMock: INFTsComponent

beforeEach(() => {
  queryMock = jest.fn()
  marketplaceSubgraphMock = {
    query: queryMock,
  }

  nftComponentMock = createNFTComponent({
    subgraph: marketplaceSubgraphMock,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceNFTFragment,
    getSortByProp: getMarketplaceOrderBy,
    getExtraVariables: getMarketplaceExtraVariables,
    getExtraWhere: getMarketplaceExtraWhere,
  })
})

describe('when fetching tokens by ids', () => {
  let tokenIds: string[] = ['1', '2', '3']

  describe('and the request fails', () => {
    beforeEach(() => {
      queryMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should propagate the error', () => {
      return expect(
        nftComponentMock.fetchByTokenIds(tokenIds)
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
        nftComponentMock.fetchByTokenIds(tokenIds)
      ).resolves.toEqual(nftFragments.map(fromMarketplaceNFTFragment))
    })
  })
})
