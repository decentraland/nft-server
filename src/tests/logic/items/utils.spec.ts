import {
  validateItemsParams,
  InvalidContractAddressError,
  InvalidItemIdError,
} from '../../../logic/items/utils'
import { isAddress } from '../../../logic/address'

jest.mock('../../../logic/address', () => ({
  isAddress: jest.fn(),
}))

describe('validateItemsParams', () => {
  const isAddressMock = isAddress as jest.Mock

  beforeEach(() => {
    isAddressMock.mockReset()
    isAddressMock.mockImplementation((address) =>
      /^0x[a-fA-F0-9]{40}$/.test(address)
    )
  })

  describe('when validating contract addresses', () => {
    it('should do nothing with valid addresses', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      expect(() => validateItemsParams([validAddress])).not.toThrow()
    })

    it('should throw InvalidContractAddressError for invalid addresses', () => {
      const invalidAddress = '0xinvalid'
      expect(() => validateItemsParams([invalidAddress])).toThrow(
        new InvalidContractAddressError(invalidAddress)
      )
    })

    it('should validate multiple addresses', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      const invalidAddress = '0xinvalid'
      expect(() => validateItemsParams([validAddress, invalidAddress])).toThrow(
        new InvalidContractAddressError(invalidAddress)
      )
    })

    it('should not throw for empty addresses array', () => {
      expect(() => validateItemsParams([])).not.toThrow()
    })
  })

  describe('when validating itemId', () => {
    it('should do nothing with valid BigInt itemId', () => {
      expect(() => validateItemsParams([], '123')).not.toThrow()
    })

    it('should throw InvalidItemIdError for non-BigInt values', () => {
      expect(() => validateItemsParams([], 'notABigInt')).toThrow(
        new InvalidItemIdError()
      )
    })

    it('should not throw for undefined or null itemId', () => {
      expect(() => validateItemsParams([], undefined)).not.toThrow()
      expect(() => validateItemsParams([], null)).not.toThrow()
    })
  })

  describe('when validating both parameters', () => {
    it('should throw InvalidContractAddressError for invalid address even with valid itemId', () => {
      const invalidAddress = '0xinvalid'
      expect(() => validateItemsParams([invalidAddress], '123')).toThrow(
        new InvalidContractAddressError(invalidAddress)
      )
    })

    it('should throw InvalidItemIdError for invalid itemId even with valid address', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      expect(() => validateItemsParams([validAddress], 'notABigInt')).toThrow(
        new InvalidItemIdError()
      )
    })

    it('should validate successfully when both parameters are valid', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      expect(() => validateItemsParams([validAddress], '123')).not.toThrow()
    })
  })
})
