import Joi from 'joi'
import type ItemType from '../types/item.types'

export const inputItemValidation = (
  payload: ItemType
): Joi.ValidationResult<ItemType> => {
  const schema = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.base': 'Item name should be a type of text',
      'string.empty': 'Please enter an item name',
      'any.required': 'Item name is a required field'
    }),
    quantity: Joi.number().required().messages({
      'number.base': 'Item quantity should be a type of number',
      'number.empty': 'Please enter an item quantity',
      'any.required': 'Item quantity is a required field'
    }),
    price: Joi.number().required().messages({
      'number.base': 'Item price should be a type of number',
      'number.empty': 'Please enter an item price',
      'any.required': 'Item price is a required field'
    })
  })

  return schema.validate(payload)
}
