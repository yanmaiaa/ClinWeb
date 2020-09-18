import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { BooleanValidatorAdapter } from '../../utils/boolean-validator-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const addAccountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const booleanValidatorAdapter = new BooleanValidatorAdapter()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(booleanValidatorAdapter, emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
