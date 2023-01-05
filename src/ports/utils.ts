import { GenderFilterOption, WearableGender } from "@dcl/schemas";

export function getGenderFilterQuery(genders: (WearableGender | GenderFilterOption)[], isEmote: boolean): string {
  const hasMale = genders.includes(GenderFilterOption.MALE)
  const hasFemale = genders.includes(GenderFilterOption.FEMALE)
  const hasUnisex = genders.includes(GenderFilterOption.UNISEX)
  const searchProperty = isEmote ? 'searchEmoteBodyShapes' : 'searchWearableBodyShapes';

  if (genders.length === 1) {
    if (hasMale) {
      return `${searchProperty}: [BaseMale]`
    }
    
    if (hasFemale) {
      return `${searchProperty}: [BaseFemale]`
    }
    
    return `${searchProperty}_contains: [BaseMale, BaseFemale]`
  }
  
  if (genders.length === 2) {
    if (hasMale && hasFemale) {
      return `${searchProperty}_contains: [BaseMale, BaseFemale]`
    }
    
    if (hasMale && hasUnisex) {
      return `${searchProperty}_contains: [BaseMale]`
    }
    
    return `${searchProperty}_contains: [BaseFemale]`
  }

  return ''
}
