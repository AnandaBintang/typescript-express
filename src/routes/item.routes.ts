import { type Request, type Response, Router } from 'express'
const itemRouter = Router()

itemRouter.get('/item', (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET /item' })
})

export default itemRouter
