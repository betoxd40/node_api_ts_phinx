import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import userRouter from './api/routes/v1/user.route'
import authRouter from './api/routes/v1/auth.route'
import { checkJwt } from './api/middlewares/checkJwt'
import { connect } from './database'

connect()

const app = express()

// Call midlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Call Routes
app.use('/v1/users', checkJwt, userRouter)
app.use('/v1/auth', authRouter)

export { app }
