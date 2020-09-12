import { AddAccount } from '../../domain/useCases/add-account'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, BooleanValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly booleanValidator: BooleanValidator,
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle = (httpRequest: HttpRequest): HttpResponse => {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'isProfessional']
      for (const field of requiredField) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const optionalField = ['professionName']
      for (const field of optionalField) {
        if (httpRequest.body.isProfessional && httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
        if (!httpRequest.body.isProfessional && httpRequest.body[field]) {
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
      this.addAccount.add({
        name,
        email,
        password,
        isProfessional,
        professionName
      })
    } catch (error) {
      return serverError()
    }
  }
}
