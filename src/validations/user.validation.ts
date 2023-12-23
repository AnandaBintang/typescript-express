import Joi from 'joi'
import type UserType from '../types/user.types'

export const inputUserValidation = (
  payload: UserType
): Joi.ValidationResult<UserType> => {
  const schema = Joi.object({
    id: Joi.string().trim().allow(null, ''),
    email: Joi.string().trim().required().email().messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Please enter an email',
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is a required field'
    }),
    name: Joi.string().trim().required().messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Please enter a name',
      'any.required': 'Name is a required field'
    }),
    password: Joi.string().min(3).max(15).required().messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Please enter a password',
      'string.min': 'Password should have a minimum length of 3 characters',
      'string.max': 'Password should have a maximum length of 15 characters',
      'any.required': 'Password is a required field'
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': '{{#label}} does not match with Password',
        'any.required': '{{#label}} is a required field'
      }),
    role: Joi.string().trim().allow(null, '')
  })

  return schema.validate(payload)
}
