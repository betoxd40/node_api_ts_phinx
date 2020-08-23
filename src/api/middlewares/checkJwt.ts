import { Request, Response, NextFunction } from 'express'
import { MESSAGE_ERRORS } from '@constants/index'
import { unauthorized, forbidden } from '@utils/errors'
import { isTokenValid } from '@utils/jwt'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.send(forbidden(MESSAGE_ERRORS.FORBIDDEN)) // if there isn't any token

  if (isTokenValid(token)) return next()
  return res.send(unauthorized(MESSAGE_ERRORS.UNAUTHORIZED))
}
