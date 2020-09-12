import { EmailValidator, BooleanValidator, AddAccount, AddAccountModel, AccountModel } from './signup-protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { SignUpController } from './signup'

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add = (account: AddAccountModel): AccountModel => {
      const fakeAccount = {
        id: 'valid_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeBooleanValidatorStub = (): BooleanValidator => {
  class BooleanValidatorStub implements BooleanValidator {
    isBoolean = (value: any): boolean => {
      return true
    }
  }
  return new BooleanValidatorStub()
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid = (email: string): boolean => {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  booleanValidatorStub: BooleanValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const booleanValidatorStub = makeBooleanValidatorStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new SignUpController(booleanValidatorStub, emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    booleanValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: false
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
        isProfessional: false
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isProfessional: false
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if no isProfessional is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('isProfessional'))
  })

  test('Should return 400 if no professionName is provided when isProfessional is true', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('professionName'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 400 if isProfessional is not a number', () => {
    const { sut, booleanValidatorStub } = makeSut()
    jest.spyOn(booleanValidatorStub, 'isBoolean').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: 'invalid_isProfessional',
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('isProfessional'))
  })

  test('Should return 400 if isProfessional is not true and professionName is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: false,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('professionName must no be provided'))
  })

  test('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call FieldValidator with correct isProfessional', () => {
    const { sut, booleanValidatorStub } = makeSut()
    const fieldValidatorSpy = jest.spyOn(booleanValidatorStub, 'isBoolean')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    sut.handle(httpRequest)
    expect(fieldValidatorSpy).toHaveBeenCalledWith(true)
  })

  test('Should call handle with httpRequest', () => {
    const { sut } = makeSut()
    const handleSpy = jest.spyOn(sut, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: 1,
        professionName: 'any_profession'
      }
    }

    sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isProfessional: true,
      professionName: 'any_profession'
    })
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if FieldValidator throws', () => {
    const { sut, booleanValidatorStub } = makeSut()
    jest.spyOn(booleanValidatorStub, 'isBoolean').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if AddAccount throws', () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isProfessional: true,
        professionName: 'any_profession'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
