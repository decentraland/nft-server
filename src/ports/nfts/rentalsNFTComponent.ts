import { NFTFilters } from '@dcl/schemas'
import { IRentalsComponent, RentalAsset } from '../rentals/types'
import { INFTsComponent, NFTResult } from './types'

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
  contractAddresses: string[]
}): INFTsComponent {
  const {
    rentalsComponent,
    marketplaceNFTsComponent,
    contractAddresses,
  } = options

  // Query the rentals subgraph to obtain a list of assets where the provided options.owner is the lessor.
  async function getRentalAssets(options: NFTFilters): Promise<RentalAsset[]> {
    return rentalsComponent.getRentalAssets({
      lessors: [options.owner!],
      contractAddresses,
      tokenIds: options.tokenIds,
      isClaimed: false,
      first: options.first,
      skip: options.skip,
    })
  }

  // Update the provided options with the data obtained from the rentals subgraph.
  function updateOptionsForMarketplaceComponent(
    options: NFTFilters,
    rentalAssets: RentalAsset[]
  ) {
    // The owner was used to query the rentals subgraph.
    // We need to remove it from here because the owner for the provided rental assets will be the rentals contract.
    // If we kept the owner here, the query to the marketplace subgraph would return invalid data.
    delete options.owner
    // Set the tokenIds we want to query the marketplace subgraph with.
    options.tokenIds = rentalAssets.map((asset) => asset.tokenId)
    // We want to query the marketplace subgraph with the contract addresses of the Land and Estate contracts only.
    options.contractAddresses = contractAddresses
  }

  // Fetch the Lands and Estates previously owned by the options.owner that are currently in the rentals contract and return their nft data.
  async function fetch(options: NFTFilters): Promise<NFTResult[]> {
    const rentalAssets = await getRentalAssets(options)
    updateOptionsForMarketplaceComponent(options, rentalAssets)
    return marketplaceNFTsComponent.fetch(options)
  }

  // Count the Lands and Estates previously owned by the options.owner that are currently in the rentals contract and return their nft data.
  async function count(options: NFTFilters): Promise<number> {
    const rentalAssets = await getRentalAssets(options)
    updateOptionsForMarketplaceComponent(options, rentalAssets)
    return marketplaceNFTsComponent.count(options)
  }

  // This function is currently not needed for the current use cases of this component so it will always return null.
  async function fetchOne(
    _contractAddress: string,
    _tokenId: string
  ): Promise<NFTResult | null> {
    return null
  }

  // This function is currently not needed for the current use cases of this component so it will always return an empty array.
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
