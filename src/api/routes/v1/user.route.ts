import express, { Request, Response } from 'express'
import { list } from '@repo/user.repo'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const users = await list()
  res.send(users)
})
export default router
