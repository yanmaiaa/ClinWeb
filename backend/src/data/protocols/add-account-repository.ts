import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/useCases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
