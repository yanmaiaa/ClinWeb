import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { FieldValidator } from '../protocols/field-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  constructor (
    private readonly fieldValidator: FieldValidator,
    private readonly emailValidator: EmailValidator
  ) {}

  handle = (httpRequest: HttpRequest): HttpResponse => {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'isProfessional', 'professionName']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) return badRequest(new InvalidParamError('email'))
    const isNumber = this.fieldValidator.isNumber(httpRequest.body.isProfessional)
    if (!isNumber) return badRequest(new InvalidParamError('isProfessional'))
  }
}
