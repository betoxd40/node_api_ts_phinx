import jwt from 'jsonwebtoken'
import { useConfigDefault } from '@utils/config'
import { JWTPayload } from '@app/types/index'

export const generateToken = (payload: JWTPayload): string => {
  const jwtKey = useConfigDefault('jwt.key')
  const jwtExpiresIn = useConfigDefault('jwt.expiresIn')

  return jwt.sign(payload, jwtKey, {
    expiresIn: jwtExpiresIn
  })
}

export const isTokenValid = (token: string): boolean => {
  const jwtKey = useConfigDefault('jwt.key')
  try {
    jwt.verify(token, jwtKey)
    return true
  } catch (error) {
    // We should log the error
    console.log(error)
    return false
  }
}

export const generatePayload = (email: string): JWTPayload => {
  return {
    email
  }
}
