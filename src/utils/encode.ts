import bcrypt from 'bcryptjs'
import { useConfig } from '@utils/config'

export const generatePasswordEncrypted = (password: string): string => {
  let salt = Number(useConfig('bcrypt.salt'))
  salt = Number(bcrypt.genSaltSync(salt))

  return bcrypt.hashSync(password, salt)
}

export const comparePasswordEncrypted = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash)
