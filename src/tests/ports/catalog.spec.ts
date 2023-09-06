import { CatalogFilters, ChainId, Network } from '@dcl/schemas'
import { IPgComponent } from '@well-known-components/pg-component'
import { createTestDbComponent, test } from '../../../src/tests/components'
import { createCatalogComponent } from '../../ports/catalog/component'
import {
  getItemIdsBySearchTextQuery,
} from '../../ports/catalog/queries'
import {
  CollectionsItemDBResult,
  ICatalogComponent,
} from '../../ports/catalog/types'
import {
  fromCollectionsItemDbResultToCatalogItem,
  getCatalogQuery,
} from '../../ports/catalog/utils'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'
import { getLatestSubgraphSchema, getSubgraphNameForNetwork } from '../../subgraphUtils'

const mockedDBItemResponse: CollectionsItemDBResult = {
  id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
  total_rows: 1,
  metadata: {
    id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
    description: 'Or will it make sense when we fall from grace?',
    category: 'horror',
    body_shapes: ['BaseMale', 'BaseFemale'],
    rarity: 'legendary',
    name: 'Descension',
    loop: false,
  },
  image:
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
  urn: 'urn:decentraland:matic:collections-v2:0xe42257bb4aada439179d736a64a736be0693a4ec:2',
}

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
          total_rows: 1,
          metadata: {
            id: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
            description: 'Or will it make sense when we fall from grace?',
            category: 'horror',
            body_shapes: ['BaseMale', 'BaseFemale'],
            rarity: 'legendary',
            name: 'Descension',
            loop: false,
          },
          image:
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
          urn: 'urn:decentraland:matic:collections-v2:0xe42257bb4aada439179d736a64a736be0693a4ec:2',
        }

        dbClientQueryMock.mockResolvedValueOnce(latestSubgraphSchemaResponse)
        dbClientQueryMock.mockResolvedValueOnce({
          rows: [dbItemResponse],
          rowCount: 1,
        })
      })

      it('should fetch the data from one subgraph and return the catalog items', async () => {
        expect(await catalogComponent.fetch(filters)).toEqual({
          data: [
            {
              ...fromCollectionsItemDbResultToCatalogItem(
                dbItemResponse,
                network
              ),
              picks: pickStats,
            },
          ],
          total: 1,
        })
        expect(dbClientQueryMock.mock.calls.length).toEqual(2)
        expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(network, ChainId.ETHEREUM_SEPOLIA)
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

        dbClientQueryMock.mockResolvedValueOnce(
          latestSubgraphSchemaResponseForEthereum
        )
        dbClientQueryMock.mockResolvedValueOnce(
          latestSubgraphSchemaResponseForMatic
        )
        dbClientQueryMock.mockResolvedValueOnce({
          rows: [mockedDBItemResponse],
          rowCount: 1,
        })
      })

      it('should fetch the data from both subgraph using a UNION query and return the catalog items and their total', async () => {
        expect(await catalogComponent.fetch(filters)).toEqual({
          data: [
            {
              ...fromCollectionsItemDbResultToCatalogItem(mockedDBItemResponse),
              picks: pickStats,
            },
          ],
          total: 1,
        })
        expect(dbClientQueryMock.mock.calls.length).toEqual(3) // 2 for the schema name and 1 for the catalog query
        expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(Network.ETHEREUM, ChainId.ETHEREUM_SEPOLIA)
          )
        )
        expect(dbClientQueryMock.mock.calls[1][0]).toEqual(
          getLatestSubgraphSchema(
            getSubgraphNameForNetwork(Network.MATIC, ChainId.MATIC_MAINNET)
          )
        )
        // The query string is expressed as an array of strings and values
        // The first part of the query should contain the total_rows
        expect(dbClientQueryMock.mock.calls[2][0].strings[0]).toContain(
          'COUNT(*) OVER() as total_rows'
        )
        // The second part should contain the UNION ALL necessary to fetch both networks
        expect(dbClientQueryMock.mock.calls[2][0].strings[1]).toContain(
          'UNION ALL'
        )
      })
    })
    describe('when fetching the catalog with a search text', () => {
      let latestSubgraphSchemaResponse: {
        rows: { entity_schema: string }[]
        rowCount: number
      }
      let pickStats: PickStats
      let network = Network.ETHEREUM
      let filters: CatalogFilters
      let latestSchema = 'sgd1234'
      let search: string

      beforeEach(() => {
        search = 'aSearchTerm'
        filters = {
          network,
          search,
        }

        latestSubgraphSchemaResponse = {
          rows: [
            {
              entity_schema: latestSchema,
            },
          ],
          rowCount: 1,
        }
        dbClientQueryMock.mockResolvedValueOnce(latestSubgraphSchemaResponse)
      })

      describe('and there are no matches for the search term', () => {
        beforeEach(() => {
          dbClientQueryMock.mockResolvedValueOnce({
            rows: [],
            rowCount: 0,
          })
        })
        it('should return an empty array and a total count of 0', async () => {
          expect(await catalogComponent.fetch(filters)).toEqual({
            data: [],
            total: 0,
          })
          expect(dbClientQueryMock.mock.calls.length).toEqual(2) // 1 for the schema name and 1 for the catalog search query
          expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
            getLatestSubgraphSchema(
              getSubgraphNameForNetwork(network, ChainId.ETHEREUM_SEPOLIA)
            )
          )
          expect(dbClientQueryMock.mock.calls[1][0]).toEqual(
            getItemIdsBySearchTextQuery(latestSchema, filters.search)
          )
          expect(dbClientQueryMock.mock.calls[1][0].values).toEqual([search])
        })
      })

      describe('and there are matches for the search term', () => {
        beforeEach(() => {
          pickStats = {
            itemId: '0xe42257bb4aada439179d736a64a736be0693a4ec-2',
            count: 1,
            pickedByUser: true,
          }
          getPicksStatsOfItemsMock.mockResolvedValue([pickStats])
          dbClientQueryMock.mockResolvedValueOnce({
            rows: [
              {
                id: mockedDBItemResponse.id,
              },
            ],
            rowCount: 1,
          })
          dbClientQueryMock.mockResolvedValueOnce({
            rows: [mockedDBItemResponse],
            rowCount: 1,
          })
        })
        it('should use the ids returned by the search query in the main catalog query', async () => {
          expect(await catalogComponent.fetch(filters)).toEqual({
            data: [
              {
                ...fromCollectionsItemDbResultToCatalogItem(
                  mockedDBItemResponse
                ),
                picks: pickStats,
              },
            ],
            total: 1,
          })
          expect(dbClientQueryMock.mock.calls.length).toEqual(3) // 1 for the schema name, 1 for the catalog search query and 1 for the main catalog query
          expect(dbClientQueryMock.mock.calls[0][0]).toEqual(
            getLatestSubgraphSchema(
              getSubgraphNameForNetwork(network, ChainId.ETHEREUM_SEPOLIA)
            )
          )
          expect(dbClientQueryMock.mock.calls[1][0]).toEqual(
            getItemIdsBySearchTextQuery(latestSchema, filters.search)
          )
          expect(dbClientQueryMock.mock.calls[1][0].values).toEqual([search])
          expect(dbClientQueryMock.mock.calls[2][0]).toEqual(
            getCatalogQuery({ [network]: latestSchema }, filters)
          )
        })
      })
    })
  })
})
