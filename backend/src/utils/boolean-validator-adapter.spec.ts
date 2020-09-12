import { BooleanValidatorAdapter } from './boolean-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isBoolean: (value: string): boolean => {
    return true
  }
}))

describe('BooleanValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new BooleanValidatorAdapter()
    jest.spyOn(validator, 'isBoolean').mockReturnValueOnce(false)

    const isBoolean = sut.isBoolean('invalid_boolean')
    expect(isBoolean).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = new BooleanValidatorAdapter()
    const isBoolean = sut.isBoolean('true')
    expect(isBoolean).toBe(true)
  })

  test('Should call isBoolean with correct value', () => {
    const sut = new BooleanValidatorAdapter()
    const isBooleanSpy = jest.spyOn(validator, 'isBoolean')

    sut.isBoolean('false')
    expect(isBooleanSpy).toHaveBeenCalledWith('false')
  })
})
