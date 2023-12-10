import { Router } from 'express'
import itemRouter from './item.routes'

const app = Router()

// http://localhost:4000/api/item
app.use('/api', itemRouter)

export default app
