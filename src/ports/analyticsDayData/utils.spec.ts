import { RentalsAnalyticsDayDataFragment } from './types'
import { mapRentalsAnalyticsFragment } from './utils'

describe('mapRentalsAnalyticsFragment', () => {
  let fragment: RentalsAnalyticsDayDataFragment

  beforeEach(() => {
    fragment = {
      id: 'id',
      date: 123,
      volume: '123',
      lessorEarnings: '123',
      feeCollectorEarnings: '123',
    }
  })

  describe('when the fragment id is "analytics-total-data"', () => {
    beforeEach(() => {
      fragment = {
        ...fragment,
        id: 'analytics-total-data',
      }
    })

    it('should map it to "all"', () => {
      expect(mapRentalsAnalyticsFragment(fragment).id).toBe('all')
    })
  })

  describe('when the fragment id is not "analytics-total-data"', () => {
    it('should keep it as it is', () => {
      expect(mapRentalsAnalyticsFragment(fragment).id).toBe(fragment.id)
    })
  })

  it('should map a rentals fragment to analytics day data object', () => {
    expect(mapRentalsAnalyticsFragment(fragment)).toEqual({
      id: fragment.id,
      date: fragment.date,
      sales: 0,
      volume: fragment.volume,
      creatorsEarnings: fragment.lessorEarnings,
      daoEarnings: fragment.feeCollectorEarnings,
    })
  })
})
