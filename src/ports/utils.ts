import { Response } from 'node-fetch'
import { GenderFilterOption, WearableGender } from '@dcl/schemas'
import { HTTPErrorResponseBody } from '../types/server'

export function getGenderFilterQuery(
  genders: (WearableGender | GenderFilterOption)[],
  isEmote: boolean
): string {
  const hasMale = genders.includes(GenderFilterOption.MALE)
  const hasFemale = genders.includes(GenderFilterOption.FEMALE)
  const hasUnisex = genders.includes(GenderFilterOption.UNISEX)
  const searchProperty = isEmote
    ? 'searchEmoteBodyShapes'
    : 'searchWearableBodyShapes'

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

export async function processRequestError(action: string, response: Response) {
  let parsedErrorResult: HTTPErrorResponseBody<any> | undefined

  try {
    parsedErrorResult = await response.json()
  } catch (_) {
    // Ignore the JSON parse result error error.
  }

  if (parsedErrorResult) {
    throw new Error(parsedErrorResult.message)
  }

  throw new Error(
    `Error ${action}, the server responded with: ${response.status}`
  )
}
