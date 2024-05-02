import {
  ChainId,
  ItemFilters,
  Network,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  FragmentItemType,
  IItemsComponent,
  ItemFragment,
  createItemsComponent,
} from '../../ports/items'
import { IBuilderComponent } from '../../ports/builder'
import { fromItemFragment } from '../../ports/items/utils'

let itemsComponent: IItemsComponent
let builderComponentMock: IBuilderComponent
let subgraphComponentMock: ISubgraphComponent
let getItemUtilityMock: jest.Mock
let querySubgraphMock: jest.Mock
let itemFragment: ItemFragment

beforeEach(() => {
  getItemUtilityMock = jest.fn()
  querySubgraphMock = jest.fn()

  builderComponentMock = {
    getItemUtility: getItemUtilityMock,
  }
  subgraphComponentMock = {
    query: querySubgraphMock,
  }

  itemsComponent = createItemsComponent(
    {
      builder: builderComponentMock,
    },
    [
      {
        subgraph: subgraphComponentMock,
        network: Network.MATIC,
        chainId: ChainId.MATIC_MAINNET,
      },
    ]
  )
  itemFragment = {
    id: '1',
    itemType: FragmentItemType.WEARABLE_V2,
    searchWearableBodyShapes: [],
    rarity: Rarity.MYTHIC,
    collection: {
      id: '0x123',
      creator: '0x234',
    },
    beneficiary: '0x0000000000000000000000000000000000000000',
    price: '0',
    image: '',
    available: '0',
    searchEmoteBodyShapes: null,
    createdAt: '0',
    updatedAt: '0',
    reviewedAt: '0',
    soldAt: '0',
    firstListedAt: null,
    urn: '',
    searchIsStoreMinter: false,
    blockchainId: '1',
    metadata: {
      wearable: {
        name: 'aWearableName',
        description: '',
        category: WearableCategory.UPPER_BODY,
      },
      emote: null,
    },
  }
})

describe('when fetching multiple items', () => {
  let filters: ItemFilters

  beforeEach(() => {
    filters = {
      network: Network.MATIC,
    }
  })

  describe('and no items where found in the graph', () => {
    beforeEach(() => {
      querySubgraphMock.mockResolvedValue({ items: [] })
    })

    it('should return an empty array of items without having fetched the item utility', async () => {
      expect(await itemsComponent.fetch(filters)).toEqual([])
      expect(getItemUtilityMock).not.toHaveBeenCalled()
    })
  })

  describe('and some items were found in the graph', () => {
    beforeEach(() => {
      querySubgraphMock.mockResolvedValue({
        items: [itemFragment],
      })
    })

    it('should resolve with the items without having requested their utility', async () => {
      expect(await itemsComponent.fetch(filters)).toEqual([
        fromItemFragment(itemFragment, Network.MATIC, ChainId.MATIC_MAINNET),
      ])
      expect(getItemUtilityMock).not.toHaveBeenCalled()
    })
  })
})

describe('when fetching a single item', () => {
  let filters: ItemFilters

  beforeEach(() => {
    filters = {
      contractAddresses: ['0x123'],
      itemId: '1',
      network: Network.MATIC,
    }
  })

  describe('and no items where found in the graph', () => {
    beforeEach(() => {
      querySubgraphMock.mockResolvedValue({ items: [] })
    })

    it('should resolve into an empty array of items without having fetched the item utility', async () => {
      expect(await itemsComponent.fetch(filters)).toEqual([])
      expect(getItemUtilityMock).not.toHaveBeenCalled()
    })
  })

  describe('and a item was found in the graph', () => {
    beforeEach(() => {
      querySubgraphMock.mockResolvedValue({
        items: [itemFragment],
      })
      getItemUtilityMock.mockResolvedValue('This is a utility')
    })

    it('should resolve the item with the utility', async () => {
      expect(await itemsComponent.fetch(filters)).toEqual([
        {
          ...fromItemFragment(
            itemFragment,
            Network.MATIC,
            ChainId.MATIC_MAINNET
          ),
          utility: 'This is a utility',
        },
      ])
    })
  })
})
