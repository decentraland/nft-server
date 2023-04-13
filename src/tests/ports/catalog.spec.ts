import { CatalogFilters, ChainId, Network } from '@dcl/schemas'
import { IPgComponent } from '@well-known-components/pg-component'
import { createTestDbComponent, test } from '../../../src/tests/components'
import { createCatalogComponent } from '../../ports/catalog/component'
import { getLatestSubgraphSchema } from '../../ports/catalog/queries'
import {
  CollectionsItemDBResult,
  ICatalogComponent,
} from '../../ports/catalog/types'
import {
  getSubgraphNameForNetwork,
  fromCollectionsItemDbResultToCatalogItem,
} from '../../ports/catalog/utils'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'

let dbQueryMock: jest.Mock
let dbClientQueryMock: jest.Mock
let dbClientReleaseMock: jest.Mock
let database: IPgComponent
let catalogComponent: ICatalogComponent
let favoritesComponentMock: IFavoritesComponent
let getPicksStatsOfItemsMock: jest.Mock

test('catalog component', function () {
  beforeEach(() => {
    dbQueryMock = jest.fn()
    dbClientQueryMock = jest.fn()
    dbClientReleaseMock = jest.fn()
    getPicksStatsOfItemsMock = jest.fn()
    favoritesComponentMock = {
      getPicksStatsOfItems: getPicksStatsOfItemsMock,
    }

    database = createTestDbComponent({
      query: dbQueryMock,
      getPool: jest.fn().mockReturnValue({
        connect: () => ({
          query: dbClientQueryMock,
          release: dbClientReleaseMock,
        }),
      }),
    })
    catalogComponent = createCatalogComponent({
      database,
      favoritesComponent: favoritesComponentMock,
      isFavoritesEnabled: true,
    })
  })

  describe('when fetching the catalog', () => {
    describe('and asking for a specific network', () => {
      let latestSubgraphSchemaResponse: {
        rows: { entity_schema: string }[]
        rowCount: number
      }
      let network = Network.ETHEREUM
      let filters: CatalogFilters
      let latestSchema = 'sgd1234'
      let dbItemResponse: CollectionsItemDBResult
      let pickStats: PickStats

      beforeEach(() => {
        pickStats = {
          itemId: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
          count: 1,
          pickedByUser: true,
        }
        getPicksStatsOfItemsMock.mockResolvedValue([pickStats])
        filters = {
          network,
        }

        latestSubgraphSchemaResponse = {
          rows: [
            {
              entity_schema: latestSchema,
            },
          ],
          rowCount: 0,
        }

        dbItemResponse = {
          id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
          metadata: {
            id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
            description: 'Or will it make sense when we fall from grace?',
            category: 'horror',
            body_shapes: ['BaseMale', 'BaseFemale'],
            rarity: 'legendary',
            name: 'Descension',
            loop: false,
          },
          thumbnail:
            'https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xe42257bb4aada439179d736a64a736be0693a4ec:2/thumbnail',
          blockchain_id: '2',
          collection: '0xe42257bb4aada439179d736a64a736be0693a4ec',
          rarity: 'legendary',
          item_type: 'emote_v1',
          price: '2000000000000000000',
          available: '84',
          search_is_store_minter: true,
          creator: '0xc2877b05cfe462e585fe3de8046f7528998af6f1',
          beneficiary: '0xc2877b05cfe462e585fe3de8046f7528998af6f1',
          created_at: '1666157762',
          updated_at: '1669312852',
          reviewed_at: '1666250754',
          sold_at: '1669312852',
          network: Network.MATIC,
          first_listed_at: '1666250996',
          min_listing_price: null,
          max_listing_price: null,
          listings_count: null,
          owners_count: 1,
          min_price: '2000000000000000000',
          max_price: '2000000000000000000',
        }

        dbClientQueryMock.mockResolvedValueOnce(latestSubgraphSchemaResponse)
        dbClientQueryMock.mockResolvedValueOnce({
          rows: [dbItemResponse],
          rowCount: 1,
        })
      })

      it('should fetch the data from one subgraph return the catalog items', async () => {
        expect(await catalogComponent.fetch(filters)).toEqual([
          {
            ...fromCollectionsItemDbResultToCatalogItem(
              dbItemResponse,
              network
            ),
            picks: pickStats,
          },
        ])
        expect(dbClientQueryMock.mock.calls.length).toEqual(2)
        expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(network, ChainId.ETHEREUM_GOERLI)
          )
        )
      })
    })

    describe('and asking with no network specified', () => {
      let latestSubgraphSchemaResponseForMatic,
        latestSubgraphSchemaResponseForEthereum: {
          rows: { entity_schema: string }[]
          rowCount: number
        }
      let filters: CatalogFilters
      let latestSchemaMatic = 'sgd1234'
      let latestSchemaEthereum = 'sgd1234'
      let dbItemResponse: CollectionsItemDBResult
      let pickStats: PickStats

      beforeEach(() => {
        pickStats = {
          itemId: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
          count: 1,
          pickedByUser: true,
        }
        getPicksStatsOfItemsMock.mockResolvedValue([pickStats])
        filters = {
          network: undefined,
        }

        latestSubgraphSchemaResponseForMatic = {
          rows: [
            {
              entity_schema: latestSchemaMatic,
            },
          ],
          rowCount: 0,
        }
        latestSubgraphSchemaResponseForEthereum = {
          rows: [
            {
              entity_schema: latestSchemaEthereum,
            },
          ],
          rowCount: 0,
        }

        dbItemResponse = {
          id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
          metadata: {
            id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
            description: 'Or will it make sense when we fall from grace?',
            category: 'horror',
            body_shapes: ['BaseMale', 'BaseFemale'],
            rarity: 'legendary',
            name: 'Descension',
            loop: false,
          },
          thumbnail:
            'https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xe42257bb4aada439179d736a64a736be0693a4ec:2/thumbnail',
          blockchain_id: '2',
          collection: '0xe42257bb4aada439179d736a64a736be0693a4ec',
          rarity: 'legendary',
          item_type: 'emote_v1',
          price: '2000000000000000000',
          available: '84',
          search_is_store_minter: true,
          creator: '0xc2877b05cfe462e585fe3de8046f7528998af6f1',
          beneficiary: '0xc2877b05cfe462e585fe3de8046f7528998af6f1',
          created_at: '1666157762',
          updated_at: '1669312852',
          reviewed_at: '1666250754',
          sold_at: '1669312852',
          network: Network.MATIC,
          first_listed_at: '1666250996',
          min_listing_price: null,
          max_listing_price: null,
          listings_count: null,
          owners_count: null,
          min_price: '2000000000000000000',
          max_price: '2000000000000000000',
        }

        dbClientQueryMock.mockResolvedValueOnce(
          latestSubgraphSchemaResponseForEthereum
        )
        dbClientQueryMock.mockResolvedValueOnce(
          latestSubgraphSchemaResponseForMatic
        )
        dbClientQueryMock.mockResolvedValueOnce({
          rows: [dbItemResponse],
          rowCount: 1,
        })
      })

      it('should fetch the data from one subgraph return the catalog items', async () => {
        expect(await catalogComponent.fetch(filters)).toEqual([
          {
            ...fromCollectionsItemDbResultToCatalogItem(dbItemResponse),
            picks: pickStats,
          },
        ])
        expect(dbClientQueryMock.mock.calls.length).toEqual(3) // 2 for the schema name and 1 for the catalog query
        expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(Network.ETHEREUM, ChainId.ETHEREUM_GOERLI)
          )
        )
        expect(dbClientQueryMock.mock.calls[1][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(Network.MATIC, ChainId.MATIC_MAINNET)
          )
        )
      })
    })
  })
})
