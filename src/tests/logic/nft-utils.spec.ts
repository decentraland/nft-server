import { NFT, NFTCategory, NFTSortBy, Order, RentalListing } from '@dcl/schemas'
import { NFTResult } from '../../ports/nfts/types'
import {
  buildNftId,
  convertNFTResultToSortableResult,
  isLAND,
} from '../../logic/nfts/utils'

let nftResult: NFTResult

describe('when checking if an NFT is a LAND', () => {
  beforeEach(() => {
    nftResult = {
      nft: {
        category: NFTCategory.ESTATE,
      } as NFT,
    } as NFTResult
  })

  describe('and the NFT is a parcel', () => {
    beforeEach(() => {
      nftResult.nft.category = NFTCategory.PARCEL
    })

    it('should return true', () => {
      expect(isLAND(nftResult)).toBe(true)
    })
  })

  describe('and the NFT is an estate', () => {
    beforeEach(() => {
      nftResult.nft.category = NFTCategory.ESTATE
    })

    it('should return true', () => {
      expect(isLAND(nftResult)).toBe(true)
    })
  })

  describe('and the NFT is not a parcel or an estate', () => {
    beforeEach(() => {
      nftResult.nft.category = NFTCategory.EMOTE
    })

    it('should return false', () => {
      expect(isLAND(nftResult)).toBe(false)
    })
  })
})

describe('when building a NFT id', () => {
  beforeEach(() => {
    nftResult = {
      nft: {
        category: NFTCategory.ESTATE,
        contractAddress: '0x0',
        tokenId: '0',
      } as NFT,
    } as NFTResult
  })

  it('should return the nft id with the category, contract address and token id', () => {
    expect(buildNftId(nftResult)).toEqual(
      `${nftResult.nft.category}-${nftResult.nft.contractAddress}-${nftResult.nft.tokenId}`
    )
  })
})

describe('when converting NFT results to sortable results', () => {
  let nftResult: NFTResult

  beforeEach(() => {
    nftResult = {
      nft: {
        id: `${NFTCategory.PARCEL}-0x0-1`,
        name: `no-rental-name-1`,
        contractAddress: '0x0',
        tokenId: '1',
        category: NFTCategory.PARCEL,
        createdAt: Date.now(),
        soldAt: Date.now(),
      } as NFT,
      order: null,
      rental: null,
    }
  })

  describe('and the nft result contains an order', () => {
    beforeEach(() => {
      nftResult = {
        ...nftResult,
        order: {
          price: '1000',
          createdAt: Date.now(),
        } as Order,
      }
    })

    it('should return a sortable result with the nft result and the order sorts set', () => {
      expect(convertNFTResultToSortableResult(nftResult)).toEqual({
        result: nftResult,
        sort: {
          [NFTSortBy.RECENTLY_LISTED]: nftResult.order!.createdAt,
          [NFTSortBy.NAME]: nftResult.nft.name.toLowerCase(),
          [NFTSortBy.CHEAPEST]: +nftResult.order!.price,
          [NFTSortBy.NEWEST]: nftResult.nft.createdAt,
          [NFTSortBy.RECENTLY_SOLD]: nftResult.nft.soldAt,
          [NFTSortBy.MIN_RENTAL_PRICE]: '0',
          [NFTSortBy.MAX_RENTAL_PRICE]: '0',
          [NFTSortBy.RENTAL_DATE]: 0,
          [NFTSortBy.RENTAL_LISTING_DATE]: 0,
        },
      })
    })
  })

  describe('and the nft result does not contain an order', () => {
    beforeEach(() => {
      nftResult = {
        ...nftResult,
        order: null,
      }
    })

    it('should return a sortable result with the nft result without the order sorts set', () => {
      expect(convertNFTResultToSortableResult(nftResult)).toEqual({
        result: nftResult,
        sort: {
          [NFTSortBy.RECENTLY_LISTED]: null,
          [NFTSortBy.NAME]: nftResult.nft.name.toLowerCase(),
          [NFTSortBy.CHEAPEST]: null,
          [NFTSortBy.NEWEST]: nftResult.nft.createdAt,
          [NFTSortBy.RECENTLY_SOLD]: nftResult.nft.soldAt,
          [NFTSortBy.MIN_RENTAL_PRICE]: '0',
          [NFTSortBy.MAX_RENTAL_PRICE]: '0',
          [NFTSortBy.RENTAL_DATE]: 0,
          [NFTSortBy.RENTAL_LISTING_DATE]: 0,
        },
      })
    })
  })

  describe('and the nft result does not contain a rental', () => {
    beforeEach(() => {
      nftResult = {
        ...nftResult,
        rental: null,
      }
    })

    it('should return a sortable result with the nft result without the rental sorts set', () => {
      expect(convertNFTResultToSortableResult(nftResult)).toEqual({
        result: nftResult,
        sort: {
          [NFTSortBy.RECENTLY_LISTED]: null,
          [NFTSortBy.NAME]: nftResult.nft.name.toLowerCase(),
          [NFTSortBy.CHEAPEST]: null,
          [NFTSortBy.NEWEST]: nftResult.nft.createdAt,
          [NFTSortBy.RECENTLY_SOLD]: nftResult.nft.soldAt,
          [NFTSortBy.MIN_RENTAL_PRICE]: '0',
          [NFTSortBy.MAX_RENTAL_PRICE]: '0',
          [NFTSortBy.RENTAL_DATE]: 0,
          [NFTSortBy.RENTAL_LISTING_DATE]: 0,
        },
      })
    })
  })

  describe('and the nft result contains a rental', () => {
    beforeEach(() => {
      nftResult = {
        ...nftResult,
        rental: {
          startedAt: Date.now(),
          createdAt: Date.now(),
        } as RentalListing,
      }
    })

    it('should return a sortable result with the nft result and the rentals sorts set', () => {
      expect(convertNFTResultToSortableResult(nftResult)).toEqual({
        result: nftResult,
        sort: {
          [NFTSortBy.RECENTLY_LISTED]: null,
          [NFTSortBy.NAME]: nftResult.nft.name.toLowerCase(),
          [NFTSortBy.CHEAPEST]: null,
          [NFTSortBy.NEWEST]: nftResult.nft.createdAt,
          [NFTSortBy.RECENTLY_SOLD]: nftResult.nft.soldAt,
          [NFTSortBy.MIN_RENTAL_PRICE]: '0',
          [NFTSortBy.MAX_RENTAL_PRICE]: '0',
          [NFTSortBy.RENTAL_DATE]: nftResult.rental?.startedAt,
          [NFTSortBy.RENTAL_LISTING_DATE]: nftResult.rental?.createdAt,
        },
      })
    })
  })
})
