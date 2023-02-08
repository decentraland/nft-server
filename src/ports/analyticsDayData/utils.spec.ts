import { AnalyticsDayDataFilters } from '@dcl/schemas'
import { RentalsAnalyticsDayDataFragment } from './types'
import {
  getRentalsAnalyticsDayDataQuery,
  mapRentalsAnalyticsFragment,
} from './utils'

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

describe('getRentalsAnalyticsDayDataQuery', () => {
  let filters: AnalyticsDayDataFilters

  beforeEach(() => {
    filters = {}
  })

  describe('when from is a number > than 0', () => {
    beforeEach(() => {
      filters = {
        from: 1,
      }
    })

    it('should add a "where" to the query', () => {
      expect(getRentalsAnalyticsDayDataQuery(filters)).toContain(
        '(where:{date_gt: 0})'
      )
    })
  })

  describe('when from is undefined', () => {
    it('should not add a "where" to the query', () => {
      expect(getRentalsAnalyticsDayDataQuery(filters)).not.toContain(
        '(where:{date_gt: 0})'
      )
    })
  })

  describe('when from is 0', () => {
    beforeEach(() => {
      filters = {
        from: 0,
      }
    })

    it('should not add a "where" to the query', () => {
      expect(getRentalsAnalyticsDayDataQuery(filters)).not.toContain(
        '(where:{date_gt: 0})'
      )
    })
  })
})
