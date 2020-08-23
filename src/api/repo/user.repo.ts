import { getManager } from 'typeorm'
import { User } from '@models/User.model'
import { CreateUser } from '@app/types/index'

export const list = (): Promise<User[]> => getManager().getRepository(User).find()

export const findOne = (email: string): Promise<User> =>
  getManager().getRepository(User).findOneOrFail({ where: { email } })

export const create = (user: CreateUser): Promise<User> =>
  getManager().getRepository(User).save(user)
