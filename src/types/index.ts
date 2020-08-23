export interface CreateUser {
  name: string
  last_name: string
  email: string
  password: string
  dni: number
  age: number
  phone: number
}

export interface PayloadBoomResponse {
  statusCode: number
  error: string
  message: string
}

export interface JWTPayload {
  email: string
}
