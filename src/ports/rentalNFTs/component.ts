import { NFTFilters } from '@dcl/schemas'
import { getLandAndEstateContractAddresses } from '../../logic/nfts/rentals'
import { INFTsComponent, NFTResult } from '../nfts/types'
import { IRentalsComponent, RentalAsset } from '../rentals/types'

// The recommended maximum amount of elements a subgraph filter_in can handle.
// For example, if we had a tokenId_in filter, the maximum amount of tokenIds provided would be this number.
export const MAX_SUBGRAPH_QUERY_IN_ELEMENTS = 500

/**
 * This component allows users to retrieve Lands and Estates by owner that are currently owned by the rentals contract.
 * Once a rental starts, the asset is transferred to the rentals contract, so when we want to use the nft server to retrieve
 * the assets owned by an address, conventionally, the assets that were rented would not be returned because the owner is the rentals
 * contract.
 * This component will first fetch the rentals subgraph to check which assets are currently rented by a given address, and then look them up
 * in the marketplace subgraph to retrieve all the nft data.
 * @param options.rentalsComponent - The rentals component which allows querying the rentals subgraph.
 * @param options.marketplaceNFTsComponent - The marketplace component which allows querying the marketplace subgraph.
 * @param options.contractAddresses - The addresses of the Land and Estate contracts which will be used to filter the results.
 */
export function createRentalsNFTComponent(options: {
  rentalsComponent: IRentalsComponent
  marketplaceNFTsComponent: INFTsComponent
  contractAddresses: ReturnType<typeof getLandAndEstateContractAddresses>
}): INFTsComponent {
  const {
    rentalsComponent,
    marketplaceNFTsComponent,
    contractAddresses,
  } = options

  /**
   * Query the rentals subgraph to obtain a list of assets where the provided filters.owner is the lessor.
   */
  async function getRentalAssets(filters: NFTFilters): Promise<RentalAsset[]> {
    return rentalsComponent.getRentalAssets({
      // This component is always called when owner is present, so we can assume owner is present here.
      lessors: [filters.owner!],
      contractAddresses: [contractAddresses.land, contractAddresses.estate],
      isClaimed: false,
      // In order to avoid pagination issues, we need to fetch all the assets for this owner in the rentals subgraph.
      // The number is determined by the maximum recommended number of entries a filter_in query can have.
      // It is improbable that any user will have more than MAX_SUBGRAPH_QUERY_IN_ELEMENTS Lands or Estates on rent.
      // But in the case that they do, retrieved data might be incomplete 💀
      first: MAX_SUBGRAPH_QUERY_IN_ELEMENTS,
    })
  }

  /**
   * Update the provided filters with the data obtained from the rentals subgraph.
   */
  function makeFiltersForMarketplaceComponent(
    originalFilters: NFTFilters,
    rentalAssets: RentalAsset[]
  ): NFTFilters {
    // Copy the original filters to avoid mutating it as they are used on other calls.
    const filters = { ...originalFilters }
    // We don't need the owner anymore as we already used it to query the rentals subgraph.
    delete filters.owner
    // Set the ids of the assets we will be looking for in the marketplace subgraph.
    filters.ids = rentalAssets.map((asset) => {
      if (asset.contractAddress === contractAddresses.land) {
        return `parcel-${asset.id}`
      }
      // The rental assets should be either of type Land or Estate, so we can assume that if it's not a Land, it's an Estate.
      else {
        return `estate-${asset.id}`
      }
    })

    return filters
  }

  /**
   * Fetch the Lands and Estates previously owned by the filters.owner that are currently in the rentals contract and return their nft data.
   */
  async function fetch(filters: NFTFilters): Promise<NFTResult[]> {
    const rentalAssets = await getRentalAssets(filters)
    const mktFilters = makeFiltersForMarketplaceComponent(filters, rentalAssets)
    return marketplaceNFTsComponent.fetch(mktFilters)
  }

  /**
   * Count the Lands and Estates previously owned by the filters.owner that are currently in the rentals contract and return their nft data.
   */
  async function count(filters: NFTFilters): Promise<number> {
    const rentalAssets = await getRentalAssets(filters)
    const mktFilters = makeFiltersForMarketplaceComponent(filters, rentalAssets)
    return marketplaceNFTsComponent.count(mktFilters)
  }

  /**
   * This function is currently not needed for the current use cases of this component so it will always return null.
   */
  async function fetchOne(
    _contractAddress: string,
    _tokenId: string
  ): Promise<NFTResult | null> {
    return null
  }

  /**
   * This function is currently not needed for the current use cases of this component so it will always return an empty array.
   */
  async function fetchByTokenIds(_tokenIds: string[]): Promise<NFTResult[]> {
    return []
  }

  return {
    fetch,
    fetchOne,
    fetchByTokenIds,
    count,
  }
}
