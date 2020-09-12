import { BooleanValidatorAdapter } from './boolean-validator-adapter'

describe('BooleanValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new BooleanValidatorAdapter()
    const isBoolean = sut.isBoolean('invalid_boolean')
    expect(isBoolean).toBe(false)
  })
})
