import {
  ChainId,
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  ItemSortBy,
  Network,
  Rarity,
} from '@dcl/schemas'
import { ItemFragment, FragmentItemType } from './types'
import { fromItemFragment, getItemsQuery } from './utils'

describe("#getItemsQuery", () => {
  describe("when minPrice is defined", () => {
    it("should add price filter to the query in wei", () => {
      expect(getItemsQuery({ minPrice: '50000000000000000' })).toEqual(expect.stringContaining('price_gte: "50000000000000000"'))
    })
  });

  describe("when maxPrice is defined", () => {
    it("should add price filter to the query in wei", () => {
      expect(getItemsQuery({ maxPrice: '50000000000000000' })).toEqual(expect.stringContaining('price_lte: "50000000000000000"'))
    })
  })

  describe("when emotePlayMode is defined", () => {
    describe("and it only has one property", () => {
      it("should add loop as true to the query for LOOP mode", () => {
        expect(getItemsQuery({ emotePlayMode: [EmotePlayMode.LOOP] })).toEqual(expect.stringContaining('searchEmoteLoop: true'))
      })

      it("should add loop as true to the query for SIMPLE mode", () => {
        expect(getItemsQuery({ emotePlayMode: [EmotePlayMode.SIMPLE] })).toEqual(expect.stringContaining('searchEmoteLoop: false'))
      })
    })

    describe("and it has more than one property", () => {
      it("should not add loop filter to the query", () => {
        expect(getItemsQuery({ emotePlayMode: [EmotePlayMode.LOOP, EmotePlayMode.SIMPLE] })).toEqual(expect.not.stringContaining('searchEmoteLoop'))
      })
    })
  })

  describe("when emoteGenders is defined", () => {
    it("should check searchEmoteBodyShapes is BaseFemale when gender is just female", () => {
      expect(getItemsQuery({ emoteGenders: [GenderFilterOption.FEMALE] })).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseFemale]'))
    })

    it("should check searchEmoteBodyShapes is BaseMale when gender is just male", () => {
      expect(getItemsQuery({ emoteGenders: [GenderFilterOption.MALE] })).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseMale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseFemale when gender is female and unisex", () => {
      expect(getItemsQuery({ emoteGenders: [GenderFilterOption.FEMALE, GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseFemale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseMale when gender is male and unisex", () => {
      expect(getItemsQuery({ emoteGenders: [GenderFilterOption.MALE, GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseMale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseMale and BaseFemale when gender is unisex", () => {
      expect(getItemsQuery({ emoteGenders: [GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseMale, BaseFemale]'))
    })
  })

  describe("when wearableGenders is defined", () => {
    it("should check searchWearableBodyShapes is BaseFemale when gender is just female", () => {
      expect(getItemsQuery({ wearableGenders: [GenderFilterOption.FEMALE] })).toEqual(expect.stringContaining('searchWearableBodyShapes: [BaseFemale]'))
    })

    it("should check searchWearableBodyShapes is BaseMale when gender is just male", () => {
      expect(getItemsQuery({ wearableGenders: [GenderFilterOption.MALE] })).toEqual(expect.stringContaining('searchWearableBodyShapes: [BaseMale]'))
    })

    it("should check searchWearableBodyShapes contains BaseFemale when gender is female and unisex", () => {
      expect(getItemsQuery({ wearableGenders: [GenderFilterOption.FEMALE, GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseFemale]'))
    })

    it("should check searchWearableBodyShapes contains BaseMale when gender is male and unisex", () => {
      expect(getItemsQuery({ wearableGenders: [GenderFilterOption.MALE, GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseMale]'))
    })

    it("should check searchWearableBodyShapes contains BaseMale and BaseFemale when gender is unisex", () => {
      expect(getItemsQuery({ wearableGenders: [GenderFilterOption.UNISEX] })).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseMale, BaseFemale]'))
    })
  })

  describe('when urns is defined', () => {
    it('should check urns in the list of urns received by params', () => {
      expect(
        getItemsQuery({
          urns: [
            'urn:decentraland:mumbai:collections-v2:0x1c8592d12157f1a63c8b207588488bfd7c3eac33:0',
            'urn:decentraland:mumbai:collections-v2:0x1c8592d12157f1a63c8b207588488bfd7c3eac37:7',
          ],
        })
      ).toEqual(
        expect.stringContaining(
          'urn_in: ["urn:decentraland:mumbai:collections-v2:0x1c8592d12157f1a63c8b207588488bfd7c3eac33:0","urn:decentraland:mumbai:collections-v2:0x1c8592d12157f1a63c8b207588488bfd7c3eac37:7"]'
        )
      )
    })
  })

  describe('when sortBy is ItemSortBy.RECENTLY_LISTED', () => {
    let query: string

    beforeEach(() => {
      query = getItemsQuery({
        sortBy: ItemSortBy.RECENTLY_LISTED,
      })
    })

    it('should add firstListedAt_not: null where filter', () => {
      expect(query.includes('firstListedAt_not: null')).toBeTruthy()
    })

    it('should add firstListedAt as orderBy', () => {
      expect(query.includes('orderBy: firstListedAt')).toBeTruthy()
    })

    it('should add desc as orderDirection', () => {
      expect(query.includes('orderDirection: desc')).toBeTruthy()
    })
  })
})

describe('#fromItemFragment', () => {
  let itemFragment: ItemFragment

  beforeEach(() => {
    itemFragment = {
      id: 'id',
      price: 'price',
      blockchainId: 'blockchainId',
      image: 'image',
      rarity: Rarity.COMMON,
      available: 'available',
      itemType: FragmentItemType.EMOTE_V1,
      collection: {
        id: 'collection',
        creator: 'creator',
      },
      metadata: {
        wearable: null,
        emote: {
          category: EmoteCategory.DANCE,
          description: 'description',
          loop: false,
          name: 'name',
        },
      },
      searchWearableBodyShapes: null,
      searchEmoteBodyShapes: null,
      searchIsStoreMinter: false,
      createdAt: '100',
      updatedAt: '100',
      reviewedAt: '100',
      soldAt: '100',
      beneficiary: 'beneficiary',
      firstListedAt: null,
    }
  })

  describe('when fragment firstListedAt is null', () => {
    beforeEach(() => {
      itemFragment.firstListedAt = null
    })

    it('should return an Item with firstListedAt as null', () => {
      const collection = fromItemFragment(
        itemFragment,
        Network.MATIC,
        ChainId.MATIC_MUMBAI
      )

      expect(collection.firstListedAt).toBeNull()
    })
  })

  describe('when fragment firstListedAt is "100"', () => {
    beforeEach(() => {
      itemFragment.firstListedAt = '100'
    })

    it('should return a Collection with firstListedAt as 100000', () => {
      const collection = fromItemFragment(
        itemFragment,
        Network.MATIC,
        ChainId.MATIC_MUMBAI
      )

      expect(collection.firstListedAt).toBe(100000)
    })
  })
})
