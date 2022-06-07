import { getUniqueItemsFromItemsDayData } from '../../../src/logic/rankings'
import { ItemsDayDataFragment } from '../../ports/rankings/types'

describe('getUniqueItemsFromItemsDayData', () => {
  describe('when providing fragments coming out from the ItemsDayData entity', () => {
    let fragments: ItemsDayDataFragment[]
    beforeEach(() => {
      fragments = [
        {
          id: '19142-0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
          sales: 3,
          volume: '330000000000000000000',
        },
        {
          id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6',
          sales: 2,
          volume: '4000000000000000000',
        },
        {
          id: '19145-0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
          sales: 1,
          volume: '12000000000000000000',
        },
        {
          id: '19143-0x922e304450169d2ed66f33290fb19e58a327e763-0',
          sales: 1,
          volume: '100000000000000000000',
        },
        {
          id: '19142-0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3',
          sales: 1,
          volume: '1000000000000000000000',
        },
        {
          id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-4',
          sales: 1,
          volume: '1000000000000000000',
        },
        // this item was already above but these stats are from another day
        {
          id: '19145-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6',
          sales: 1,
          volume: '1000000000000000000',
        },
      ]
    })
    it('should return the accumulated data by adding them', () => {
      expect(
        getUniqueItemsFromItemsDayData(fragments, { from: 123 })
      ).toStrictEqual({
        '0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0': {
          id: '0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
          sales: 3,
          volume: '330000000000000000000',
        },
        '0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6': {
          id: '0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6',
          sales: 3,
          volume: '5000000000000000000',
        },
        '0x52c98c80a5aad12056596d3b2dd4139c327bc501-1': {
          id: '0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
          sales: 1,
          volume: '12000000000000000000',
        },
        '0x922e304450169d2ed66f33290fb19e58a327e763-0': {
          id: '0x922e304450169d2ed66f33290fb19e58a327e763-0',
          sales: 1,
          volume: '100000000000000000000',
        },
        '0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3': {
          id: '0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3',
          sales: 1,
          volume: '1000000000000000000000',
        },
        '0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-4': {
          id: '0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-4',
          sales: 1,
          volume: '1000000000000000000',
        },
      })
    })
  })
})
