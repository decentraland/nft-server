import {
  BodyShape,
  EmoteCategory,
  NFTCategory,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { FragmentItemType } from '../../ports/items/types'
import { CollectionsFragment, fromCollectionsFragment } from './collections'

describe('when building a result from the collections subgraph fragment', () => {
  let collectionsFragment: CollectionsFragment
  beforeEach(() => {
    collectionsFragment = {
      id: '0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
      itemType: FragmentItemType.WEARABLE_V2,
      image:
        'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x52c98c80a5aad12056596d3b2dd4139c327bc501:0/thumbnail',
      contractAddress: '0x52c98c80a5aad12056596d3b2dd4139c327bc501',
      tokenId: '1',
      owner: { address: '0xf543b8d0c922ae974317da46d7c200ce59cbd90f' },
      metadata: {
        wearable: {
          name: 'M Hat Mexican',
          description: 'A traditional Mexican Hat',
          category: WearableCategory.HAT,
          rarity: Rarity.MYTHIC,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
        },
        emote: null,
      },
      createdAt: '1646687629',
      updatedAt: '1646687629',
      soldAt: '1646687629',
      searchOrderPrice: null,
      searchOrderCreatedAt: null,
      itemBlockchainId: '0',
      issuedId: '1',
      activeOrder: null,
    }
  })

  describe('with a fragment of type wearable_v2', () => {
    it('should return a result with a name, a category of wearable, and containing wearable data', () => {
      const result = fromCollectionsFragment(collectionsFragment)
      expect(result.nft.name).toBe('M Hat Mexican')
      expect(result.nft.category).toBe(NFTCategory.WEARABLE)
      expect(result.nft.data.wearable).toEqual({
        description: 'A traditional Mexican Hat',
        category: WearableCategory.HAT,
        bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
        rarity: Rarity.MYTHIC,
        isSmart: false,
      })
    })
  })

  describe('with a fragment of type emote_v1', () => {
    beforeEach(() => {
      collectionsFragment.itemType = FragmentItemType.EMOTE_V1
      collectionsFragment.metadata = {
        wearable: null,
        emote: {
          name: 'Fashion Pose',
          description: 'Some engaging description',
          category: EmoteCategory.DANCE,
          rarity: Rarity.LEGENDARY,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
        },
      }
    })
    it('should return a result with a name, a category of emote, and containing emote data', () => {
      const result = fromCollectionsFragment(collectionsFragment)
      expect(result.nft.name).toBe('Fashion Pose')
      expect(result.nft.category).toBe(NFTCategory.EMOTE)
      expect(result.nft.data.emote).toEqual({
        description: 'Some engaging description',
        category: EmoteCategory.DANCE,
        bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
        rarity: Rarity.LEGENDARY,
      })
    })
  })
})
