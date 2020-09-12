import { Controller, EmailValidator, BooleanValidator, HttpRequest, HttpResponse, AddAccount } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly booleanValidator: BooleanValidator,
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'isProfessional']
      for (const field of requiredField) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const optionalField = ['professionName']
      const falsyBoolean = ['0', 'false']
      const truthBoolean = ['1', 'true']
      for (const field of optionalField) {
        if (httpRequest.body.isProfessional &&
            truthBoolean.includes(httpRequest.body.isProfessional) &&
            httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
        if ((!httpRequest.body.isProfessional ||
          (httpRequest.body.isProfessional &&
            falsyBoolean.includes(httpRequest.body.isProfessional))
        ) && httpRequest.body[field]) {
          return badRequest(new InvalidParamError('professionName must no be provided'))
        }
      }
      const { name, email, password, passwordConfirmation, isProfessional, professionName = null } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      const isBoolean = this.booleanValidator.isBoolean(isProfessional)
      if (!isBoolean) return badRequest(new InvalidParamError('isProfessional'))
      const account = await this.addAccount.add({
        name,
        email,
        password,
        isProfessional,
        professionName
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
