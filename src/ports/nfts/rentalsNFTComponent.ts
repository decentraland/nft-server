import { NFTFilters } from '@dcl/schemas'
import { IRentalsComponent } from '../rentals/types'
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

  async function fetch(options: NFTFilters): Promise<NFTResult[]> {
    if (!options.owner || !options.isLand) {
      return []
    }

    const rentalAssets = await rentalsComponent.getRentalAssets({
      lessors: [options.owner],
      contractAddresses,
      tokenIds: options.tokenIds,
    })

    delete options.owner
    options.tokenIds = rentalAssets.map((asset) => asset.tokenId)
    options.contractAddresses = contractAddresses

    return marketplaceNFTsComponent.fetch(options)
  }

  async function count(_options: NFTFilters): Promise<number> {
    return 0
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
