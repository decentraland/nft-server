import { ethers } from 'ethers'
import { URLSearchParams } from 'url'
import {
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  NFTCategory,
  Network,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { Params } from '../../../logic/http/params'
import { getItemsParams } from '../../../adapters/handlers/utils'

describe('getItemsParams', () => {
  let params: Params
  let category: NFTCategory
  let creator: string
  describe('when there are no valid params sent', () => {
    beforeEach(() => {
      params = new Params(new URLSearchParams(`invalidParam=aValue`))
    })
    it('should return all the default values', () => {
      expect(getItemsParams(params)).toEqual({
        category: undefined,
        contractAddresses: [],
        creator: [],
        emoteCategory: undefined,
        emoteGenders: [],
        emotePlayMode: [],
        ids: [],
        isOnSale: undefined,
        isSoldOut: false,
        isWearableAccessory: false,
        isWearableHead: false,
        isWearableSmart: false,
        itemId: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        network: undefined,
        rarities: [],
        search: undefined,
        urns: [],
        wearableCategory: undefined,
        wearableGenders: [],
        emoteHasSound: false,
        emoteHasGeometry: false,
      })
    })
  })
  describe('when sending the category param', () => {
    beforeEach(() => {
      category = NFTCategory.EMOTE
      params = new Params(new URLSearchParams(`category=${category}`))
    })
    it('should add the category to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        category,
      })
    })
  })
  describe('when sending the creator param', () => {
    beforeEach(() => {
      creator = '0xanAddress'
      params = new Params(new URLSearchParams(`creator=${creator}`))
    })
    it('should add the creator to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        creator: [creator],
      })
    })
  })
  describe('when sending the isSoldOut param', () => {
    let isSoldOut: boolean
    beforeEach(() => {
      isSoldOut = true
      params = new Params(new URLSearchParams(`isSoldOut=${isSoldOut}`))
    })
    it('should add the isSoldOut to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        isSoldOut,
      })
    })
  })
  describe('when sending the isOnSale param', () => {
    let isOnSale: boolean
    beforeEach(() => {
      isOnSale = true
      params = new Params(new URLSearchParams(`isOnSale=${isOnSale}`))
    })
    it('should add the isOnSale to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        isOnSale,
      })
    })
  })
  describe('when sending the search param', () => {
    let search: string
    beforeEach(() => {
      search = 'aSearch'
      params = new Params(new URLSearchParams(`search=${search}`))
    })
    it('should add the search to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        search,
      })
    })
  })
  describe('when sending the isWearableHead param', () => {
    let isWearableHead: boolean
    beforeEach(() => {
      isWearableHead = true
      params = new Params(
        new URLSearchParams(`isWearableHead=${isWearableHead}`)
      )
    })
    it('should add the isWearableHead to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        isWearableHead,
      })
    })
  })
  describe('when sending the isWearableAccessory param', () => {
    let isWearableAccessory: boolean
    beforeEach(() => {
      isWearableAccessory = true
      params = new Params(
        new URLSearchParams(`isWearableAccessory=${isWearableAccessory}`)
      )
    })
    it('should add the isWearableAccessory to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        isWearableAccessory,
      })
    })
  })
  describe('when sending the isWearableSmart param', () => {
    let isWearableSmart: boolean
    beforeEach(() => {
      isWearableSmart = true
      params = new Params(
        new URLSearchParams(`isWearableSmart=${isWearableSmart}`)
      )
    })
    it('should add the isWearableSmart to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        isWearableSmart,
      })
    })
  })
  describe('when sending the wearableCategory param', () => {
    let wearableCategory: WearableCategory
    beforeEach(() => {
      wearableCategory = WearableCategory.BODY_SHAPE
      params = new Params(
        new URLSearchParams(`wearableCategory=${wearableCategory}`)
      )
    })
    it('should add the wearableCategory to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        wearableCategory,
      })
    })
  })
  describe('when sending the rarities param', () => {
    let rarities: Rarity
    beforeEach(() => {
      rarities = Rarity.COMMON
      params = new Params(new URLSearchParams(`rarity=${rarities}`))
    })
    it('should add the rarities to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        rarities: [rarities],
      })
    })
  })
  describe('when sending the wearableGenders param', () => {
    let wearableGenders: GenderFilterOption
    beforeEach(() => {
      wearableGenders = GenderFilterOption.FEMALE
      params = new Params(
        new URLSearchParams(`wearableGender=${wearableGenders}`)
      )
    })
    it('should add the rarities to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        wearableGenders: [wearableGenders],
      })
    })
  })
  describe('when sending the emoteCategory param', () => {
    let emoteCategory: EmoteCategory
    beforeEach(() => {
      emoteCategory = EmoteCategory.DANCE
      params = new Params(new URLSearchParams(`emoteCategory=${emoteCategory}`))
    })
    it('should add the rarities to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        emoteCategory,
      })
    })
  })
  describe('when sending the emoteGenders param', () => {
    let emoteGenders: GenderFilterOption
    beforeEach(() => {
      emoteGenders = GenderFilterOption.FEMALE
      params = new Params(new URLSearchParams(`emoteGender=${emoteGenders}`))
    })
    it('should add the emoteGenders to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        emoteGenders: [emoteGenders],
      })
    })
  })
  describe('when sending the emotePlayMode param', () => {
    let emotePlayModes: EmotePlayMode[]
    beforeEach(() => {
      emotePlayModes = [EmotePlayMode.LOOP, EmotePlayMode.SIMPLE]
      params = new Params(
        new URLSearchParams(
          `emotePlayMode=${emotePlayModes[0]}&emotePlayMode=${emotePlayModes[1]}`
        )
      )
    })
    it('should add the emotePlayMode to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        emotePlayMode: emotePlayModes,
      })
    })
  })
  describe('when sending the itemId param', () => {
    let itemId: string
    beforeEach(() => {
      itemId = 'anItemId'
      params = new Params(new URLSearchParams(`itemId=${itemId}`))
    })
    it('should add the itemId to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        itemId,
      })
    })
  })
  describe('when sending the network param', () => {
    let network: Network
    beforeEach(() => {
      network = Network.ETHEREUM
      params = new Params(new URLSearchParams(`network=${network}`))
    })
    it('should add the network to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        network,
      })
    })
  })
  describe('when sending the maxPrice param', () => {
    let maxPrice: string
    beforeEach(() => {
      maxPrice = '1'
      params = new Params(new URLSearchParams(`maxPrice=${maxPrice}`))
    })
    it('should add the parsed maxPrice to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        maxPrice: ethers.utils.parseEther(maxPrice).toString(),
      })
    })
  })
  describe('when sending the minPrice param', () => {
    let minPrice: string
    beforeEach(() => {
      minPrice = '1'
      params = new Params(new URLSearchParams(`minPrice=${minPrice}`))
    })
    it('should add the parsed maxPrice to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        minPrice: ethers.utils.parseEther(minPrice).toString(),
      })
    })
  })
  describe('when sending the urns param', () => {
    let urn: string
    beforeEach(() => {
      urn = '1'
      params = new Params(new URLSearchParams(`urn=${urn}`))
    })
    it('should add the urns to the object', () => {
      expect(getItemsParams(params)).toMatchObject({
        urns: [urn],
      })
    })
  })
})
