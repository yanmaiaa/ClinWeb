import { BooleanValidatorAdapter } from './boolean-validator-adapter'
import validator from 'validator'
import { BooleanValidator } from '../presentation/protocols'

jest.mock('validator', () => ({
  isBoolean: (value: string): boolean => {
    return true
  }
}))

const makeSut = (): BooleanValidator => {
  return new BooleanValidatorAdapter()
}

describe('BooleanValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isBoolean').mockReturnValueOnce(false)

    const isBoolean = sut.isBoolean('invalid_boolean')
    expect(isBoolean).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isBoolean = sut.isBoolean('true')
    expect(isBoolean).toBe(true)
  })

  test('Should call isBoolean with correct value', () => {
    const sut = makeSut()
    const isBooleanSpy = jest.spyOn(validator, 'isBoolean')

    sut.isBoolean('false')
    expect(isBooleanSpy).toHaveBeenCalledWith('false')
  })
})
