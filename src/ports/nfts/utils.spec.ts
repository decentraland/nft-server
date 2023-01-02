import { EmotePlayMode } from '@dcl/schemas';
import { getFetchQuery } from './utils';

describe("#getItemsQuery", () => {
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
});
