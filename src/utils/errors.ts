import Boom from '@hapi/boom'
import { PayloadBoomResponse } from '@app/types/index'

export const badRequest = (message: string): PayloadBoomResponse =>
  Boom.badRequest(message).output.payload

export const serverUnavailable = (message: string): PayloadBoomResponse =>
  Boom.serverUnavailable(message).output.payload

export const unauthorized = (message: string): PayloadBoomResponse =>
  Boom.unauthorized(message).output.payload

export const forbidden = (message: string): PayloadBoomResponse =>
  Boom.forbidden(message).output.payload
