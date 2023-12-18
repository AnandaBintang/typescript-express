import { Router } from 'express'
import itemRouter from './item.routes'
import { errorHandling, notFound } from '../controllers/error.controller'

const app = Router()

// http://localhost:4000/api/item
app.use('/api', itemRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app
