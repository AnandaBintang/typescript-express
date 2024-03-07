import { Router } from 'express'
import { getAllItem, inputItem } from '../controllers/item.controller'
import { authenticate } from '../controllers/error.controller'

const itemRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemRouter.get('/item', authenticate, getAllItem)
itemRouter.post('/item', authenticate, inputItem)

export default itemRouter
