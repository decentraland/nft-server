import { EmotePlayMode } from '@dcl/schemas';
import { getItemsQuery } from './utils';

describe("#getItemsQuery", () => {
  describe("when minPrice is defined", () => {
    it("should add price filter to the query in wei", () => {
      expect(getItemsQuery({ minPrice: '0.05' })).toEqual(expect.stringContaining('price_gte: "50000000000000000"'))
    })
  });

  describe("when maxPrice is defined", () => {
    it("should add price filter to the query in wei", () => {
      expect(getItemsQuery({ maxPrice: '0.05' })).toEqual(expect.stringContaining('price_lte: "50000000000000000"'))
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
});
