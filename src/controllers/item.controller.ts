import { type NextFunction, type Request, type Response } from 'express'
import type ItemType from '../types/item.types'
import { inputItemValidation } from '../validations/item.validation'
import { getItem } from '../services/item.service'

export const getAllItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await getItem()
    return res.status(200).json({
      error: null,
      message: 'Get all item success!',
      data
    })
  } catch (error: Error | any) {
    next(new Error('Error in getAllItem: ' + error.message))
  }
}

export const inputItem = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const { error, value } = inputItemValidation(req.body as ItemType)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input item failed!',
        data: value
      })
    }

    return res.status(200).json({
      error: null,
      message: 'Input item success!',
      data: value
    })
  } catch (error: Error | any) {
    next(new Error('Error in inputItem: ' + error.message))
  }
}
