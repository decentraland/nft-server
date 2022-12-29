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
});
