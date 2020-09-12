import { BooleanValidator } from '../presentation/protocols'
import validator from 'validator'

export class BooleanValidatorAdapter implements BooleanValidator {
  isBoolean = (value: string): boolean => {
    return validator.isBoolean(value)
  }
}
