import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, FieldValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly fieldValidator: FieldValidator,
    private readonly emailValidator: EmailValidator
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
      const { email, password, passwordConfirmation, isProfessional } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      const isNumber = this.fieldValidator.isNumber(isProfessional)
      if (!isNumber) return badRequest(new InvalidParamError('isProfessional'))
    } catch (error) {
      return serverError()
    }
  }
}
