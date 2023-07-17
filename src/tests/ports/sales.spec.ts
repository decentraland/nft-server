import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { ChainId, Network, SaleType } from '@dcl/schemas'
import { ISalesComponent, SaleFragment } from '../../ports/sales/types'
import { createSalesComponent } from '../../ports/sales/component'
import { fromSaleFragment } from '../../ports/sales/utils'

let subgraphMock: ISubgraphComponent
let salesComponent: ISalesComponent

// Mock the subgraph query response
const mockSalesFragments: SaleFragment[] = [
  {
    id: 'sale1',
    price: '100',
    buyer: 'buyer1',
    seller: 'seller1',
    timestamp: '1234567890',
    txHash: '0x1234567890',
    type: SaleType.ORDER,
    searchContractAddress: '0x1234567890',
    searchTokenId: 'token1',
    searchItemId: 'itemId1',
  },
  {
    id: 'sale2',
    price: '101',
    buyer: 'buyer2',
    seller: 'seller2',
    timestamp: '1234567891',
    txHash: '0x1234567890',
    type: SaleType.ORDER,
    searchContractAddress: '0x1234567890',
    searchTokenId: 'token2',
    searchItemId: 'itemId2',
  },
]

beforeEach(() => {
  subgraphMock = {
    query: jest.fn(),
  }

  salesComponent = createSalesComponent({
    subgraph: subgraphMock,
    network: Network.ETHEREUM,
    chainId: ChainId.ETHEREUM_MAINNET,
  })
})

describe('when fetching the sales', () => {
  describe('and the request is not valid', () => {
    describe("because the component's network is different to the filters' network", () => {
      beforeEach(() => {
        salesComponent = createSalesComponent({
          subgraph: subgraphMock,
          network: Network.MATIC, // changes the network to MATIC
          chainId: ChainId.MATIC_MAINNET,
        })
      })
      it('should return an empty array', async () => {
        // Define invalid filters that won't trigger a fetch
        const invalidFilters = {
          network: Network.ETHEREUM,
        }

        const result = await salesComponent.fetch(invalidFilters)
        // Expect the subgraph query not to be called
        expect(subgraphMock.query).not.toHaveBeenCalled()
        // Expect the result to be an empty array
        expect(result).toEqual([])
      })
    })
    describe('because the filters are for a SaleType.MINT on Ethereum', () => {
      it('should return an empty array', async () => {
        // Define invalid filters that won't trigger a fetch
        const invalidFilters = {
          type: SaleType.MINT,
        }

        // Call the fetch method with invalid filters
        const result = await salesComponent.fetch(invalidFilters)
        // Expect the subgraph query not to be called
        expect(subgraphMock.query).not.toHaveBeenCalled()
        // Expect the result to be an empty array
        expect(result).toEqual([])
      })
    })
  })

  describe('and the shouldFetch function is provided', () => {
    describe('and it returns false', () => {
      it('should return an empty array', async () => {
        // Mock the shouldFetch function to return false
        const shouldFetchMock = jest.fn().mockReturnValue(false)

        // Create the sales component with the shouldFetch function
        salesComponent = createSalesComponent({
          subgraph: subgraphMock,
          network: Network.ETHEREUM,
          chainId: 1,
          shouldFetch: shouldFetchMock,
        })

        // Define invalid filters that won't trigger a fetch
        const invalidFilters = {
          network: Network.ETHEREUM,
        }

        // Call the fetch method with invalid filters
        const result = await salesComponent.fetch(invalidFilters)

        // Expect the subgraph query not to be called
        expect(subgraphMock.query).not.toHaveBeenCalled()
        // Expect the result to be an empty array
        expect(result).toEqual([])
      })
    })
    describe('and it returns true', () => {
      it('should fetch the sales', async () => {
        // Mock the shouldFetch function to return true
        const shouldFetchMock = jest.fn().mockReturnValue(true)

        // Create the sales component with the shouldFetch function
        salesComponent = createSalesComponent({
          subgraph: subgraphMock,
          network: Network.ETHEREUM,
          chainId: 1,
          shouldFetch: shouldFetchMock,
        })
        ;(subgraphMock.query as jest.Mock).mockResolvedValue({
          sales: mockSalesFragments,
        })

        const filters = {
          contractAddress: '0x1234567890',
        }

        const result = await salesComponent.fetch(filters)

        // Expect the subgraph query to be called with the correct arguments
        expect(subgraphMock.query).toHaveBeenCalledWith(
          expect.stringContaining('searchContractAddress')
        )

        // Expect the result to match the mocked sales
        expect(result).toEqual(
          mockSalesFragments.map((fragment) =>
            fromSaleFragment(fragment, Network.ETHEREUM, 1)
          )
        )
      })
    })
  })

  describe('and useLegacySchema is true', () => {
    fit('should not include searchItemId field in the query', async () => {
      // Create the sales component with the shouldFetch function
      salesComponent = createSalesComponent({
        subgraph: subgraphMock,
        network: Network.ETHEREUM,
        chainId: 1,
        useLegacySchema: true,
      })
      ;(subgraphMock.query as jest.Mock).mockResolvedValue({
        sales: mockSalesFragments,
      })

      const filters = {
        contractAddress: '0x1234567890',
      }

      await salesComponent.fetch(filters)
      // Expect the subgraph query to be called with the correct arguments
      expect(subgraphMock.query).toHaveBeenCalledWith(
        expect.not.stringContaining('searchItemId')
      )
    })
  })

  describe('and useLegacySchema is false', () => {
    fit('should include searchItemId field in the query', async () => {
      // Create the sales component with the shouldFetch function
      salesComponent = createSalesComponent({
        subgraph: subgraphMock,
        network: Network.ETHEREUM,
        chainId: 1,
      })
      ;(subgraphMock.query as jest.Mock).mockResolvedValue({
        sales: mockSalesFragments,
      })

      const filters = {
        contractAddress: '0x1234567890',
      }

      await salesComponent.fetch(filters)
      // Expect the subgraph query to be called with the correct arguments
      expect(subgraphMock.query).toHaveBeenCalledWith(
        expect.stringContaining('searchItemId')
      )
    })
  })

  describe('and the request is valid and shouldFetch is not provided', () => {
    it('should fetch the sales', async () => {
      ;(subgraphMock.query as jest.Mock).mockResolvedValue({
        sales: mockSalesFragments,
      })

      const filters = {
        contractAddress: '0x1234567890',
      }

      const result = await salesComponent.fetch(filters)
      // Expect the result to match the mocked sales
      expect(result).toEqual(
        mockSalesFragments.map((fragment) =>
          fromSaleFragment(fragment, Network.ETHEREUM, 1)
        )
      )
    })
  })
})
