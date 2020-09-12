import { BooleanValidator } from '../presentation/protocols'

export class BooleanValidatorAdapter implements BooleanValidator {
  isBoolean = (value: string): boolean => {
    return false
  }
}
