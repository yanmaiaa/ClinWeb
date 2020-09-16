import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  encrypt = async (value: string): Promise<string> => {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
