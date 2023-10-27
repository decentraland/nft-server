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
  getCollectionsItemsCatalogQuery,
  getCollectionsQueryWhere,
  getItemIdsBySearchTextQuery,
  getOrderBy,
} from '../../ports/catalog/queries'
import { FragmentItemType } from '../../ports/items/types'
import { test } from '../components'
import { getLatestSubgraphSchema } from '../../subgraphUtils'

test('catalog utils', () => {
  describe('getCatalogQuery', () => {
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
              expect(
                getCollectionsQueryWhere(filters).text.replace(/\s+/g, ' ')
              ).toContain(
                `items.item_type IN ('${FragmentItemType.WEARABLE_V1}', '${FragmentItemType.WEARABLE_V2}', '${FragmentItemType.SMART_WEARABLE_V1}')`
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
        describe('and is set to "true"', () => {
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
        describe('and is set to "false"', () => {
          beforeEach(() => {
            isOnSale = false
            filters = {
              isOnSale,
            }
          })
          it('should add the is on sale definition to the WHERE', () => {
            expect(getCollectionsQueryWhere(filters).text).toContain(
              `items.search_is_collection_approved = true AND ((search_is_store_minter = false OR available = 0) AND listings_count IS NULL)`
            )
          })
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
            `(min_price >= $1 OR (price >= $2 AND available > 0 AND search_is_store_minter = true))`
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
            `(max_price <= $1 OR (price <= $2 AND available > 0 AND search_is_store_minter = true))`
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
            `(items.search_is_store_minter = false OR (items.search_is_store_minter = true AND available = 0)) AND listings_count > 0`
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

      describe('and passing the "urns" filter', () => {
        beforeEach(() => {
          filters = {
            urns: ['anUrn'],
          }
        })
        it('should add the urns definition to the WHERE', () => {
          expect(getCollectionsQueryWhere(filters).text).toContain(
            `items.urn = ANY($1)`
          )
          expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
            filters.urns,
          ])
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
            expect(getCollectionsQueryWhere(filters).values).toStrictEqual([
              true,
            ])
          })
        })

        describe('and passing emoteHasSound as true', () => {
          beforeEach(() => {
            filters = {
              emoteCategory,
              emoteHasSound: true,
            }
          })

          it('should add the sound related definition to the WHERE', () => {
            expect(getCollectionsQueryWhere(filters).text).toContain(
              'items.search_emote_has_sound = true'
            )
          })
        })

        describe('and passing emoteHasGeometry as true', () => {
          beforeEach(() => {
            filters = {
              emoteCategory,
              emoteHasGeometry: true,
            }
          })

          it('should add the geometry related definition to the WHERE', () => {
            expect(getCollectionsQueryWhere(filters).text).toContain(
              'items.search_emote_has_geometry = true'
            )
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
          expect(getOrderBy({ sortBy })).toContain(
            `ORDER BY min_price asc, first_listed_at desc`
          )
        })
      })
      describe('when the `search` filter is passed in the filter object', () => {
        let ids: string[]
        let search: string
        beforeEach(() => {
          ids = ['anId', 'anotherId']
          search = 'a search string'
        })
        it('should ORDER BY the ids order in the array', () => {
          const orderBy = getOrderBy({ search, ids }) as SQLStatement
          expect(orderBy.text).toContain(
            `ORDER BY array_position($1::text[], id) `
          )
          expect(orderBy.values).toContain(ids)
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

    describe('when there is a prince range applied', () => {
      let query: SQLStatement
      let filters: CatalogFilters
      let minPrice: string
      let maxPrice: string
      describe('and there is only min price applied', () => {
        beforeEach(() => {
          minPrice = '10'
          filters = {
            minPrice,
          }
          query = getCollectionsItemsCatalogQuery('aSchemaVersion', filters)
        })
        it('should apply the range to the orders table JOIN', () => {
          const queryTextFormatted = query.text.replace(/\s+/g, ' ')
          expect(query.text).toContain(`AND orders.price >= $`)
          expect(queryTextFormatted).toContain(
            `CASE WHEN items.available > 0 AND items.search_is_store_minter = true AND items.price >= $2 THEN LEAST(items.price, nfts_with_orders.min_price) ELSE nfts_with_orders.min_price END AS min_price`
          )
          expect(query.text).not.toContain(`AND orders.price <= $`)
          expect(query.values.includes(minPrice)).toBe(true)
        })
      })
      describe('and there is only max price applied', () => {
        beforeEach(() => {
          maxPrice = '100'
          filters = {
            maxPrice,
          }
          query = getCollectionsItemsCatalogQuery('aSchemaVersion', filters)
        })
        it('should apply the range to the orders table JOIN', () => {
          const queryTextFormatted = query.text.replace(/\s+/g, ' ')
          expect(query.text).toContain(`AND orders.price <= $`)
          expect(queryTextFormatted).toContain(
            `CASE WHEN items.available > 0 AND items.search_is_store_minter = true AND items.price <= $2 THEN GREATEST(items.price, nfts_with_orders.max_price) ELSE nfts_with_orders.max_price END AS max_price`
          )
          expect(query).not.toContain(`AND orders.price >= $`)
          expect(query.values.includes(maxPrice)).toBe(true)
        })
      })
      describe('and has both min and prices applied', () => {
        beforeEach(() => {
          minPrice = '10'
          maxPrice = '100'
          filters = {
            minPrice,
            maxPrice,
          }
          query = getCollectionsItemsCatalogQuery('aSchemaVersion', filters)
        })
        it('should apply the range to the orders table JOIN', () => {
          expect(query.text).toContain(`AND orders.price <= $`)
          expect(query.text).toContain(`AND orders.price >= $`)
          expect(query.values.includes(minPrice)).toBe(true)
          expect(query.values.includes(maxPrice)).toBe(true)
        })
      })
    })
  })
  describe('getItemIdsBySearchTextQuery', () => {
    describe('and passing the "search" filter', () => {
      let search: string
      let schema: string
      let category: NFTCategory
      let limit: number
      let offset: number
      beforeEach(() => {
        schema = 'aSchema'
        search = 'a search string'
        limit = 10
        offset = 0
      })

      describe('and there is no category', () => {
        it('should both JOINs with metadata_wearable and metadata_emote and trigram matching operator', () => {
          const query = getItemIdsBySearchTextQuery(schema, {
            search,
            category,
            limit,
            offset,
          })
          expect(query.text).toContain(
            `LEFT JOIN LATERAL unnest(string_to_array(metadata_wearable.name, ' ')) AS word_wearable ON TRUE `
          )
          expect(query.text).toContain(
            `LEFT JOIN LATERAL unnest(string_to_array(metadata_emote.name, ' ')) AS word_emote ON TRUE `
          )
          expect(query.text).toContain(`word_wearable % $4 OR word_emote % $5 `)
          // it appears four times `JOIN LATERAL unnest(string_to_array(metadata_emote.name, ' ')) AS word ON TRUE WHERE word % $1 ORDER BY GREATEST(similarity(word, $2))`
          expect(query.values).toStrictEqual(Array(7).fill(search))
        })
      })

      describe('and the category is Wearable', () => {
        beforeEach(() => {
          category = NFTCategory.WEARABLE
        })
        it('should add JOIN with the metadata_wearable and trigram matching operator', () => {
          const query = getItemIdsBySearchTextQuery(schema, {
            search,
            category,
            limit,
            offset,
          })
          expect(query.text).toContain(
            `JOIN LATERAL unnest(string_to_array(metadata_wearable.name, ' ')) AS word ON TRUE `
          )
          expect(query.text).toContain(`word % $4 `)
          // it appears twice `JOIN LATERAL unnest(string_to_array(metadata_wearable.name, ' ')) AS word ON TRUE WHERE word % $1 ORDER BY GREATEST(similarity(word, $2))`
          expect(query.values).toStrictEqual(Array(7).fill(search))
        })
      })

      describe('and the category is Emote', () => {
        beforeEach(() => {
          category = NFTCategory.EMOTE
        })
        it('should add JOIN with the metadata_emote', () => {
          const query = getItemIdsBySearchTextQuery(schema, {
            search,
            category,
            limit,
            offset,
          })
          expect(query.text).toContain(
            `JOIN LATERAL unnest(string_to_array(metadata_emote.name, ' ')) AS word ON TRUE `
          )
          expect(query.text).toContain(`word % $4 `)
          // it appears twice `JOIN LATERAL unnest(string_to_array(metadata_emote.name, ' ')) AS word ON TRUE WHERE word % $1 ORDER BY GREATEST(similarity(word, $2), similarity(metadata_wearable.name, $3), similarity(metadata_emote.name, $4))`
          expect(query.values).toStrictEqual(Array(7).fill(search))
        })
      })

      it('should search for all ids without limit', () => {
        const query = getItemIdsBySearchTextQuery(schema, {
          search,
          category,
          limit,
          offset,
        })

        expect(query.text).not.toContain('LIMIT')
        expect(query.text).not.toContain('OFFSET')
      })
    })
  })
})
