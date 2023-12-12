import { Router } from 'express'
import { getAllItem, inputItem } from '../controllers/item.controller'

const itemRouter = Router()

itemRouter.get('/item', getAllItem)
itemRouter.post('/item', inputItem)

export default itemRouter
