import { NFTFilters } from '@dcl/schemas'
import { IRentalsComponent, RentalAsset } from '../rentals/types'
import { INFTsComponent, NFTResult } from './types'

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

  function updateOptionsForMarketplaceComponent(
    options: NFTFilters,
    rentalAssets: RentalAsset[]
  ) {
    delete options.owner
    options.tokenIds = rentalAssets.map((asset) => asset.tokenId)
    options.contractAddresses = contractAddresses
  }

  async function fetch(options: NFTFilters): Promise<NFTResult[]> {
    const rentalAssets = await getRentalAssets(options)
    updateOptionsForMarketplaceComponent(options, rentalAssets)
    return marketplaceNFTsComponent.fetch(options)
  }

  async function count(options: NFTFilters): Promise<number> {
    const rentalAssets = await getRentalAssets(options)
    updateOptionsForMarketplaceComponent(options, rentalAssets)
    return marketplaceNFTsComponent.count(options)
  }

  async function fetchOne(
    _contractAddress: string,
    _tokenId: string
  ): Promise<NFTResult | null> {
    return null
  }

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
