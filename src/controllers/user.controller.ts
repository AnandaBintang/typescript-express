import { type NextFunction, type Request, type Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import {
  createUser,
  deleteUserById,
  findAllUser,
  findUserByEmail,
  findUserById,
  userLogin
} from '../services/user.service'
import { encrypt } from '../utils/bcrypt'
import type UserType from '../types/user.types'
import { compare } from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const users = await findAllUser()

    if (users.length === 0) {
      return res.status(400).json({
        error: 'No user found!',
        message: 'Failed to get all users!',
        data: null
      })
    }

    return res.status(200).json({
      error: null,
      message: 'Get all users success!',
      data: users
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: getAllUsers: ' +
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { error, value } = loginUserValidation(req.body as UserType)

    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Failed to login user!',
        data: value
      })
    }

    const user = await userLogin(value)

    if (user == null) {
      return res.status(400).json({
        error: 'User not found!',
        message: 'Failed to login user!',
        data: null
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-boolean-literal-compare
    if ((await compare(value.password, user.password)) === false) {
      return res.status(400).json({
        error: 'Invalid password!',
        message: 'Failed to login user!',
        data: null
      })
    }

    const usr = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    const accessToken = generateAccessToken(usr)
    const refreshToken = generateRefreshToken(usr)

    return res.status(200).json({
      error: null,
      message: 'Login user success!',
      data: usr,
      accessToken,
      refreshToken
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/user.controller.ts: loginUser: ' +
          error.message
      )
    )
  }
}
