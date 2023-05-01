import SQL, { SQLStatement } from 'sql-template-strings'
import {
  CatalogFilters,
  CatalogSortBy,
  EmoteCategory,
  EmotePlayMode,
  NFTCategory,
  Rarity,
  WearableGender,
} from '@dcl/schemas'
import {
  addQueryPagination,
  addQuerySort,
  getCollectionsQueryWhere,
  getLatestSubgraphSchema,
  getOrderBy,
} from '../../ports/catalog/queries'
import { FragmentItemType } from '../../ports/items/types'
import { test } from '../components'

test('catalog utils', function () {
  describe('when getting the latest subgraph schema by subgraph name', () => {
    let subgrahName = 'collections-matic'
    it('should contain the subgraph name asked as part of the query values', () => {
      expect(getLatestSubgraphSchema(subgrahName).text).toContain(
        `satsuma_subgraph_name = `
      )
      expect(getLatestSubgraphSchema(subgrahName).values).toStrictEqual([
        subgrahName,
      ])
    })
  })

  describe('when getting the "WHERE" statement', () => {
    let filters: CatalogFilters
    describe('and passing a valid category', () => {
      describe('and the category passed is Wearable', () => {
        beforeEach(() => {
          filters = {
            category: NFTCategory.WEARABLE,
          }
        })
        describe('and the isWearableSmart filter is passed as well', () => {
          beforeEach(() => {
            filters.isWearableSmart = true
          })
          it('should only set smart_wearable_v1 as item.type', () => {
            expect(getCollectionsQueryWhere(filters).text).toContain(
              `items.item_type = '${FragmentItemType.SMART_WEARABLE_V1}'`
            )
          })
        })
        describe('and the isWearableSmart filter is not specified', () => {
          beforeEach(() => {
            filters.isWearableSmart = undefined
          })
          it('should set all the wearable valid item types', () => {
            expect(getCollectionsQueryWhere(filters).text).toContain(
              `items.item_type IN 
            ('${FragmentItemType.WEARABLE_V1}', '${FragmentItemType.WEARABLE_V2}', '${FragmentItemType.SMART_WEARABLE_V1}')`
            )
          })
        })
      })
      describe('and the category passed is Emote', () => {
        beforeEach(() => {
          filters = {
            category: NFTCategory.EMOTE,
          }
        })

        it('should set the emote item type', () => {
          expect(getCollectionsQueryWhere(filters).text).toContain(
            `items.item_type = '${FragmentItemType.EMOTE_V1}'`
          )
        })
      })
    })
    describe('and passing a creator', () => {
      let creator: string
      beforeEach(() => {
        creator = '0xaCreatorAddress'
        filters = {
          creator,
        }
      })
      it('should add the creator field to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.creator = $1`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.creator,
        ])
      })
    })

    describe('and passing the "isSouldOut"', () => {
      let isSoldOut: boolean
      beforeEach(() => {
        isSoldOut = true
        filters = {
          isSoldOut,
        }
      })
      it('should add the creator field to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `WHERE items.search_is_collection_approved = true AND items.available = 0`
        )
      })
    })

    describe('and passing the "isOnSale" filter', () => {
      let isOnSale: boolean
      beforeEach(() => {
        isOnSale = true
        filters = {
          isOnSale,
        }
      })
      it('should add the is on sale definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `((search_is_store_minter = true AND available > 0) OR listings_count IS NOT NULL)`
        )
      })
    })

    describe('and passing the "search" filter', () => {
      let search: string
      beforeEach(() => {
        search = 'a search string'
        filters = {
          search,
        }
      })
      it('should add the is search definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.search_text ILIKE '%' || $1 || '%'`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.search,
        ])
      })
    })

    describe('and passing the "rarities" filter', () => {
      let rarities: Rarity[]
      beforeEach(() => {
        rarities = [Rarity.COMMON, Rarity.EPIC]
        filters = {
          rarities,
        }
      })
      it('should add the rarities definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.rarity = ANY($1)`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.rarities,
        ])
      })
    })

    describe('and passing the "contractAddresses" filter', () => {
      let contractAddresses: string[]
      beforeEach(() => {
        contractAddresses = ['0xaContractAddress']
        filters = {
          contractAddresses,
        }
      })
      it('should add the contract addresses definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.collection = ANY($1)`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.contractAddresses,
        ])
      })
    })

    describe('and passing the "minPrice" filter', () => {
      let minPrice: string
      beforeEach(() => {
        minPrice = '123'
        filters = {
          minPrice,
        }
      })
      it('should add the min price definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `(min_price >= $1 OR (price >= $2 AND available > 0))`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.minPrice,
          filters.minPrice,
        ])
      })
    })

    describe('and passing the "maxPrice" filter', () => {
      let maxPrice: string
      beforeEach(() => {
        maxPrice = '123'
        filters = {
          maxPrice,
        }
      })
      it('should add the max price definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `(max_price <= $1 OR (price <= $2 AND available > 0))`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          filters.maxPrice,
          filters.maxPrice,
        ])
      })
    })

    describe('and passing the "onlyListing" filter', () => {
      let onlyListing: boolean
      beforeEach(() => {
        onlyListing = true
        filters = {
          onlyListing,
        }
      })
      it('should add the only listing definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `(items.search_is_store_minter = false OR (items.search_is_store_minter = true AND available = 0)) AND listings_count > 1`
        )
      })
    })

    describe('and passing the "onlyMinting" filter', () => {
      let onlyMinting: boolean
      beforeEach(() => {
        onlyMinting = true
        filters = {
          onlyMinting,
        }
      })
      it('should add the only minting definition to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.search_is_store_minter = true AND available > 0`
        )
      })
    })

    describe('and passing the wearable related filters', () => {
      let isWearableHead: boolean, isWearableAccessory: boolean
      beforeEach(() => {
        ;(isWearableAccessory = true), (isWearableHead = true)
        filters = {
          isWearableHead,
          isWearableAccessory,
          wearableGenders: [WearableGender.FEMALE, WearableGender.MALE],
        }
      })
      it('should add the wearable related definitions to the WHERE', () => {
        expect(getCollectionsQueryWhere(filters).text).toContain(
          `items.search_is_wearable_head = true AND items.search_is_wearable_accessory = true AND items.search_wearable_body_shapes @> ($1)`
        )
        expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
          ['BaseFemale', 'BaseMale'],
        ])
      })
    })

    describe('and passing the emote related filters', () => {
      let emoteCategory: EmoteCategory, emotePlayMode: EmotePlayMode[]
      beforeEach(() => {
        emoteCategory = EmoteCategory.DANCE
      })
      describe('and passing two emote play modes', () => {
        beforeEach(() => {
          ;(emotePlayMode = [EmotePlayMode.LOOP, EmotePlayMode.SIMPLE]),
            (filters = {
              emoteCategory,
              emotePlayMode,
            })
        })
        it('should ignore them since it is the same as asking all of them', () => {
          expect(getCollectionsQueryWhere(filters).text).not.toContain(
            `metadata_emote.loop =`
          )
        })
      })
      describe('and passing only one play mode', () => {
        beforeEach(() => {
          ;(emotePlayMode = [EmotePlayMode.LOOP]),
            (filters = {
              emoteCategory,
              emotePlayMode,
            })
        })
        it('should add the emote related definition to the WHERE', () => {
          expect(getCollectionsQueryWhere(filters).text).toContain(
            `metadata_emote.category = '${EmoteCategory.DANCE}'`
          )
          expect(getCollectionsQueryWhere(filters).text).toContain(
            `metadata_emote.loop = $1`
          )
          expect(getCollectionsQueryWhere(filters).values).toStrictEqual([true])
        })
      })
    })
  })

  describe('when getting the catalog "ORDER BY" statement', () => {
    let sortBy: CatalogSortBy
    describe('when sorting by NEWEST', () => {
      beforeEach(() => {
        sortBy = CatalogSortBy.NEWEST
      })
      it('should ORDER BY created_at field', () => {
        expect(getOrderBy({ sortBy })).toContain(
          `ORDER BY first_listed_at desc NULLS last`
        )
      })
    })
    describe('when sorting by MOST_EXPENSIVE', () => {
      beforeEach(() => {
        sortBy = CatalogSortBy.MOST_EXPENSIVE
      })
      it('should ORDER BY max_price field', () => {
        expect(getOrderBy({ sortBy })).toContain(`ORDER BY max_price desc`)
      })
    })
    describe('when sorting by RECENTLY_LISTED', () => {
      let onlyListing: boolean
      beforeEach(() => {
        sortBy = CatalogSortBy.RECENTLY_LISTED
      })

      it('should ORDER BY created_at field', () => {
        expect(getOrderBy({ sortBy, onlyListing })).toContain(
          `ORDER BY GREATEST(max_order_created_at, first_listed_at) desc`
        )
      })
    })
    describe('when sorting by RECENTLY_SOLD', () => {
      beforeEach(() => {
        sortBy = CatalogSortBy.RECENTLY_SOLD
      })
      it('should ORDER BY sold_at field', () => {
        expect(getOrderBy({ sortBy })).toContain(`ORDER BY sold_at desc`)
      })
    })
    describe('when sorting by CHEAPEST', () => {
      beforeEach(() => {
        sortBy = CatalogSortBy.CHEAPEST
      })
      it('should ORDER BY min_price field', () => {
        expect(getOrderBy({ sortBy })).toContain(`ORDER BY min_price asc`)
      })
    })
  })

  describe('when adding the catalog "LIMIT" and "OFFSET" statements to the query', () => {
    let offset: number, limit: number
    let query: SQLStatement
    beforeEach(() => {
      offset = 10
      limit = 5
      query = SQL``
    })
    it('should add LIMIT and OFFSET to the query', () => {
      addQuerySort(query, { offset, limit })
      addQueryPagination(query, { offset, limit })
      expect(query.text).toBe(`LIMIT $1 OFFSET $2`)
      expect(query.values).toStrictEqual([limit, offset])
    })
  })
})
