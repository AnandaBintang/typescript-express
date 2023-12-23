import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { deleteUser, registerUser } from '../controllers/user.controller'

const userRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
userRouter.post('/register', expressAsyncHandler(registerUser))
userRouter.delete('/user/delete/:id', expressAsyncHandler(deleteUser))

export default userRouter
