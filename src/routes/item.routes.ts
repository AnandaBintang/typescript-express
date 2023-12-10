import { type Request, type Response, Router } from 'express'
import { inputItemValidation } from '../validation/item.validation'
import type ItemType from '../types/item.types'

const itemRouter = Router()

itemRouter.get('/item', (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET /item' })
})

itemRouter.post('/item', (req: Request, res: Response) => {
  const { error, value } = inputItemValidation(req.body as ItemType)
  if (error != null) {
    return res.status(400).json({
      error: error.details[0].message,
      message: 'Input item failed!',
      data: value
    })
  }

  return res.status(200).json({
    error: null,
    message: 'Input item success!',
    data: value
  })
})

export default itemRouter
