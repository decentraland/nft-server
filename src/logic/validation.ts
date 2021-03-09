import Ajv, { ValidateFunction } from 'ajv'
import { Schema } from '../types/validation'

const ajv = new Ajv()

export function generateValidator<T>(schema: Schema<T>): ValidateFunction<T> {
  return ajv.compile<T>(schema)
}
