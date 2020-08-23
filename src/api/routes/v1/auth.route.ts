import express, { Request, Response } from 'express'
import { validate } from 'class-validator'
import { badRequest, unauthorized, serverUnavailable } from '@utils/errors'
import { comparePasswordEncrypted, generatePasswordEncrypted } from '@utils/encode'
import { generatePayload, generateToken } from '@utils/jwt'
import { MESSAGE_ERRORS, PG_UNIQUE_VIOLATION } from '@constants/index'
import { findOne, create } from '@repo/user.repo'
import { User } from '@models/User.model'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password

  if (!(email && password)) return res.send(badRequest(MESSAGE_ERRORS.SCHEMA_DATA))

  const userExist = await checkIfUserExist(email, password)
  if (!userExist) return res.send(unauthorized(MESSAGE_ERRORS.UNAUTHORIZED))

  const jwtPayload = generatePayload(email)
  const token = generateToken(jwtPayload)

  return res.json({
    token: token
  })
})

router.post('/register', async (req: Request, res: Response) => {
  try {
    const passwordEncrypted = await generatePasswordEncrypted(req.body.password)
    const user = createUserSchema({ ...req.body, password: passwordEncrypted })

    const isValidUserSchema = await validate(user)
    if (isValidUserSchema.length > 0) return res.send(badRequest(MESSAGE_ERRORS.SCHEMA_DATA))

    const response = await create(user)
    return res.send(response)
  } catch (error) {
    if (error.code == PG_UNIQUE_VIOLATION)
      return res.send(badRequest(MESSAGE_ERRORS.CONSTRAINT_DATA))
    return res.send(serverUnavailable(MESSAGE_ERRORS.SERVER_UNEXPECTED))
  }
})

const createUserSchema = (user: User) => {
  const userSchema = new User()
  userSchema.name = user.name
  userSchema.last_name = user.last_name
  userSchema.password = user.password
  userSchema.email = user.email
  userSchema.dni = user.dni
  userSchema.phone = user.phone
  userSchema.age = user.age

  return userSchema
}

const checkIfUserExist = async (email: string, password: string): Promise<boolean> => {
  try {
    const user = await findOne(email)
    return user ? comparePasswordEncrypted(password, user.password) : false
  } catch (error) {
    return false
  }
}

export default router
