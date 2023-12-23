import { type NextFunction, type Request, type Response } from 'express'
import { inputUserValidation } from '../validations/user.validation'
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById
} from '../services/user.service'
import { encrypt } from '../utils/bcrypt'
import type UserType from '../types/user.types'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { error, value } = inputUserValidation(req.body as UserType)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Failed to register user!',
        data: value
      })
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(value.email)
    if (existingUser != null) {
      return res.status(400).json({
        error: 'Email already exists!',
        message: 'Failed to register user!',
        data: value
      })
    }

    // Encrypt password
    value.password = encrypt(value.password)
    delete value.confirmPassword

    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'Register user success!',
      data: user
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: registerUser: ' +
          error.message
      )
    )
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params

    // Check if user exists
    const existingUser = await findUserById(id)
    if (existingUser == null) {
      return res.status(400).json({
        error: 'User not found!',
        message: 'Failed to delete user!',
        data: null
      })
    }

    const user = await deleteUserById(id)

    return res.status(200).json({
      error: null,
      message: 'Delete user success!',
      data: user
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: deleteUser: ' +
          error.message
      )
    )
  }
}
