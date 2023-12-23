import { Router } from 'express'
import itemRouter from './item.routes'
import userRouter from './user.routes'
import { errorHandling, notFound } from '../controllers/error.controller'

const app = Router()

// http://localhost:4000/api/item
app.use('/api', itemRouter)
app.use('/api', userRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app
