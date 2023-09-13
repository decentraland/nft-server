import { EmotePlayMode, GenderFilterOption, NFTCategory } from '@dcl/schemas'
import { getFetchQuery } from './utils'

describe('#getFetchQuery', () => {
  let bannedNames = ['aBannedName']
  describe('when the array of banned list is passed', () => {
    fit('should add the name_not_in filter to the query', () => {
      expect(
        getFetchQuery(
          {},
          '',
          () => '',
          undefined,
          undefined,
          false,
          bannedNames
        )
      ).toEqual(
        expect.stringContaining(
          `name_not_in: [${bannedNames.map((name) => `"${name}"`).join(', ')}]`
        )
      )
    })
  })
  describe('when emotePlayMode is defined', () => {
    describe('and it only has one property', () => {
      it('should add loop as true to the query for LOOP mode', () => {
        expect(
          getFetchQuery({ emotePlayMode: [EmotePlayMode.LOOP] }, '', () => '')
        ).toEqual(expect.stringContaining('searchEmoteLoop: true'))
      })

      it('should add loop as true to the query for SIMPLE mode', () => {
        expect(
          getFetchQuery({ emotePlayMode: [EmotePlayMode.SIMPLE] }, '', () => '')
        ).toEqual(expect.stringContaining('searchEmoteLoop: false'))
      })
    })

    describe('and it has more than one property', () => {
      it('should not add loop filter to the query', () => {
        expect(
          getFetchQuery(
            { emotePlayMode: [EmotePlayMode.LOOP, EmotePlayMode.SIMPLE] },
            '',
            () => ''
          )
        ).toEqual(expect.not.stringContaining('searchEmoteLoop'))
      })
    })
  })

  describe('when emoteGenders is defined', () => {
    it('should check searchEmoteBodyShapes is BaseFemale when gender is just female', () => {
      expect(
        getFetchQuery(
          { emoteGenders: [GenderFilterOption.FEMALE] },
          '',
          () => ''
        )
      ).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseFemale]'))
    })

    it('should check searchEmoteBodyShapes is BaseMale when gender is just male', () => {
      expect(
        getFetchQuery({ emoteGenders: [GenderFilterOption.MALE] }, '', () => '')
      ).toEqual(expect.stringContaining('searchEmoteBodyShapes: [BaseMale]'))
    })

    it('should check searchEmoteBodyShapes contains BaseFemale when gender is female and unisex', () => {
      expect(
        getFetchQuery(
          {
            emoteGenders: [
              GenderFilterOption.FEMALE,
              GenderFilterOption.UNISEX,
            ],
          },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining('searchEmoteBodyShapes_contains: [BaseFemale]')
      )
    })

    it('should check searchEmoteBodyShapes contains BaseMale when gender is male and unisex', () => {
      expect(
        getFetchQuery(
          {
            emoteGenders: [GenderFilterOption.MALE, GenderFilterOption.UNISEX],
          },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining('searchEmoteBodyShapes_contains: [BaseMale]')
      )
    })

    it('should check searchEmoteBodyShapes contains BaseMale and BaseFemale when gender is unisex', () => {
      expect(
        getFetchQuery(
          { emoteGenders: [GenderFilterOption.UNISEX] },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining(
          'searchEmoteBodyShapes_contains: [BaseMale, BaseFemale]'
        )
      )
    })
  })

  describe('when wearableGenders is defined', () => {
    it('should check searchWearableBodyShapes is BaseFemale when gender is just female', () => {
      expect(
        getFetchQuery(
          { wearableGenders: [GenderFilterOption.FEMALE] },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining('searchWearableBodyShapes: [BaseFemale]')
      )
    })

    it('should check searchWearableBodyShapes is BaseMale when gender is just male', () => {
      expect(
        getFetchQuery(
          { wearableGenders: [GenderFilterOption.MALE] },
          '',
          () => ''
        )
      ).toEqual(expect.stringContaining('searchWearableBodyShapes: [BaseMale]'))
    })

    it('should check searchWearableBodyShapes contains BaseFemale when gender is female and unisex', () => {
      expect(
        getFetchQuery(
          {
            wearableGenders: [
              GenderFilterOption.FEMALE,
              GenderFilterOption.UNISEX,
            ],
          },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining(
          'searchWearableBodyShapes_contains: [BaseFemale]'
        )
      )
    })

    it('should check searchWearableBodyShapes contains BaseMale when gender is male and unisex', () => {
      expect(
        getFetchQuery(
          {
            wearableGenders: [
              GenderFilterOption.MALE,
              GenderFilterOption.UNISEX,
            ],
          },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining('searchWearableBodyShapes_contains: [BaseMale]')
      )
    })

    it('should check searchWearableBodyShapes contains BaseMale and BaseFemale when gender is unisex', () => {
      expect(
        getFetchQuery(
          { wearableGenders: [GenderFilterOption.UNISEX] },
          '',
          () => ''
        )
      ).toEqual(
        expect.stringContaining(
          'searchWearableBodyShapes_contains: [BaseMale, BaseFemale]'
        )
      )
    })
  })

  describe('when adjacentToRoad is defined', () => {
    describe('and isLand is set to true', () => {
      it('should search for lands that are adjacent to a road', () => {
        expect(
          getFetchQuery({ adjacentToRoad: true, isLand: true }, '', () => '')
        ).toEqual(expect.stringContaining('searchAdjacentToRoad: true'))
      })
    })

    describe.each([NFTCategory.PARCEL, NFTCategory.ESTATE])(
      'and category is set to %s',
      (category) => {
        it('should search for lands that are adjacent to a road', () => {
          expect(
            getFetchQuery({ adjacentToRoad: true, category }, '', () => '')
          ).toEqual(expect.stringContaining('searchAdjacentToRoad: true'))
        })
      }
    )

    describe('and isLand and category are not defined', () => {
      it('should not add adjacentToRoad search in query', () => {
        expect(
          getFetchQuery({ adjacentToRoad: true }, '', () => '')
        ).not.toEqual(expect.stringContaining('searchAdjacentToRoad: true'))
      })
    })
  })

  describe('when minDistanceToPlaza is defined', () => {
    describe('and isLand is set to true', () => {
      it('should search for lands that have a distance greater than the one defined', () => {
        expect(
          getFetchQuery({ minDistanceToPlaza: 2, isLand: true }, '', () => '')
        ).toEqual(expect.stringContaining('searchDistanceToPlaza_gte: 2'))
      })
    })

    describe.each([NFTCategory.PARCEL, NFTCategory.ESTATE])(
      'and category is set to %s',
      (category) => {
        it('should search for lands that have a distance greater than the one defined', () => {
          expect(
            getFetchQuery({ minDistanceToPlaza: 2, category }, '', () => '')
          ).toEqual(expect.stringContaining('searchDistanceToPlaza_gte: 2'))
        })
      }
    )

    describe('and isLand and category are not defined', () => {
      it('should not add distance to land search in query', () => {
        expect(
          getFetchQuery({ minDistanceToPlaza: 2 }, '', () => '')
        ).not.toEqual(expect.stringContaining('searchDistanceToPlaza_gte: 2'))
      })
    })
  })

  describe('when maxDistanceToPlaza is defined', () => {
    describe('and isLand is set to true', () => {
      it('should search for lands that have a distance smaller than the one defined and at least distance 0', () => {
        const fetchQuery = getFetchQuery(
          { maxDistanceToPlaza: 2, isLand: true },
          '',
          () => ''
        )
        expect(fetchQuery).toEqual(
          expect.stringContaining('searchDistanceToPlaza_lte: 2')
        )
      })
    })

    describe.each([NFTCategory.PARCEL, NFTCategory.ESTATE])(
      'and category is set to %s',
      (category) => {
        const fetchQuery = getFetchQuery(
          { maxDistanceToPlaza: 2, category },
          '',
          () => ''
        )
        it('should search for lands that have a distance smaller than the one defined and at least distance 0', () => {
          expect(fetchQuery).toEqual(
            expect.stringContaining('searchDistanceToPlaza_lte: 2')
          )
        })
      }
    )

    describe('and isLand and category are not defined', () => {
      it('should not add distance to land search in query', () => {
        const fetchQuery = getFetchQuery(
          { maxDistanceToPlaza: 2 },
          '',
          () => ''
        )
        expect(fetchQuery).not.toEqual(
          expect.stringContaining('searchDistanceToPlaza_lte: 2')
        )
      })
    })
  })

  describe('when emoteHasSound is true', () => {
    describe('and category is emote', () => {
      it('should search for emotes with sound', () => {
        expect(
          getFetchQuery({ category: NFTCategory.EMOTE, emoteHasSound: true }, '', () => '')
        ).toEqual(expect.stringContaining('searchEmoteHasSound: true'))
      })
    })

    describe('and category is not emote', () => {
      it('should not add the has sound filter', () => {
        expect(
          getFetchQuery({ category: NFTCategory.ENS, emoteHasSound: true }, '', () => '')
        ).toEqual(expect.not.stringContaining('searchEmoteHasSound: true'))
      })
    })
  })

  describe('when emoteHasGeometry is true', () => {
    describe('and category is emote', () => {
      it('should search for emotes with geometry', () => {
        expect(
          getFetchQuery({ category: NFTCategory.EMOTE, emoteHasGeometry: true }, '', () => '')
        ).toEqual(expect.stringContaining('searchEmoteHasGeometry: true'))
      })
    })

    describe('and category is not emote', () => {
      it('should not add the has geometry filter', () => {
        expect(
          getFetchQuery({ category: NFTCategory.ENS, emoteHasGeometry: true }, '', () => '')
        ).toEqual(expect.not.stringContaining('searchEmoteHasGeometry: true'))
      })
    })
  })
})
