import { Router } from 'express'
import { getAllItem, inputItem } from '../controllers/item.controller'

const itemRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemRouter.get('/item', getAllItem)
itemRouter.post('/item', inputItem)

export default itemRouter
