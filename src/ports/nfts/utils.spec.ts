import { EmotePlayMode, GenderFilterOption } from '@dcl/schemas';
import { getFetchQuery } from './utils';

describe("#getFetchQuery", () => {
  describe("when emotePlayMode is defined", () => {
    describe("and it only has one property", () => {
      it("should add loop as true to the query for LOOP mode", () => {
        expect(getFetchQuery({ emotePlayMode: [EmotePlayMode.LOOP] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteLoop: true'))
      })

      it("should add loop as true to the query for SIMPLE mode", () => {
        expect(getFetchQuery({ emotePlayMode: [EmotePlayMode.SIMPLE] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteLoop: false'))
      })
    })

    describe("and it has more than one property", () => {
      it("should not add loop filter to the query", () => {
        expect(getFetchQuery({ emotePlayMode: [EmotePlayMode.LOOP, EmotePlayMode.SIMPLE] }, '', () => '')).toEqual(expect.not.stringContaining('searchEmoteLoop'))
      })
    })
  })

  describe("when emoteGenders is defined", () => {
    it("should check searchEmoteBodyShapes is BaseFemale when gender is just female", () => {
      expect(getFetchQuery({ emoteGenders: [GenderFilterOption.FEMALE] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseFemale]'))
    })

    it("should check searchEmoteBodyShapes is BaseMale when gender is just male", () => {
      expect(getFetchQuery({ emoteGenders: [GenderFilterOption.MALE] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseMale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseFemale when gender is female and unisex", () => {
      expect(getFetchQuery({ emoteGenders: [GenderFilterOption.FEMALE, GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseFemale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseMale when gender is male and unisex", () => {
      expect(getFetchQuery({ emoteGenders: [GenderFilterOption.MALE, GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseMale]'))
    })

    it("should check searchEmoteBodyShapes contains BaseMale and BaseFemale when gender is unisex", () => {
      expect(getFetchQuery({ emoteGenders: [GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchEmoteBodyShapes_contains: [BaseMale, BaseFemale]'))
    })
  })

  describe("when wearableGenders is defined", () => {
    it("should check searchWearableBodyShapes is BaseFemale when gender is just female", () => {
      expect(getFetchQuery({ wearableGenders: [GenderFilterOption.FEMALE] }, '', () => '')).toEqual(expect.stringContaining('searchWearableBodyShapes: [BaseFemale]'))
    })

    it("should check searchWearableBodyShapes is BaseMale when gender is just male", () => {
      expect(getFetchQuery({ wearableGenders: [GenderFilterOption.MALE] }, '', () => '')).toEqual(expect.stringContaining('searchWearableBodyShapes: [BaseMale]'))
    })

    it("should check searchWearableBodyShapes contains BaseFemale when gender is female and unisex", () => {
      expect(getFetchQuery({ wearableGenders: [GenderFilterOption.FEMALE, GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseFemale]'))
    })

    it("should check searchWearableBodyShapes contains BaseMale when gender is male and unisex", () => {
      expect(getFetchQuery({ wearableGenders: [GenderFilterOption.MALE, GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseMale]'))
    })

    it("should check searchWearableBodyShapes contains BaseMale and BaseFemale when gender is unisex", () => {
      expect(getFetchQuery({ wearableGenders: [GenderFilterOption.UNISEX] }, '', () => '')).toEqual(expect.stringContaining('searchWearableBodyShapes_contains: [BaseMale, BaseFemale]'))
    })
  })

  describe("when adjacentToRoad is defined", () => {
    it("should search for lands that are adjacent to a road", () => {
      expect(getFetchQuery({ adjacentToRoad: true }, '', () => '')).toEqual(expect.stringContaining('searchAdjacentToRoad: true'))
    })
  })

  describe("when minDistanceToPlaza is defined", () => {
    it("should search for lands that have a distance greater than the one defined", () => {
      expect(getFetchQuery({ minDistanceToPlaza: 2 }, '', () => '')).toEqual(expect.stringContaining('searchDistanceToPlaza_gte: 2'))
    })
  })

  describe("when maxDistanceToPlaza is defined", () => {
    it("should search for lands that have a distance smaller than the one defined and at least distance 0", () => {
      const fetchQuery = getFetchQuery({ maxDistanceToPlaza: 2, isLand: true }, '', () => '');
      expect(fetchQuery).toEqual(expect.stringContaining('searchDistanceToPlaza_gte: 0'))
      expect(fetchQuery).toEqual(expect.stringContaining('searchDistanceToPlaza_lte: 2'))
    })
  })
});
