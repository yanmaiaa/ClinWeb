import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  add = async (account: AddAccountModel): Promise<AccountModel> => {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
