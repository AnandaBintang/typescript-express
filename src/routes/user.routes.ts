import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser
} from '../controllers/user.controller'

const userRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
userRouter.get('/user', expressAsyncHandler(getAllUsers))
userRouter.post('/register', expressAsyncHandler(registerUser))
userRouter.delete('/user/delete/:id', expressAsyncHandler(deleteUser))
userRouter.post('/login', expressAsyncHandler(loginUser))

export default userRouter
