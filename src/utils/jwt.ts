import 'dotenv/config'
import jsonWebToken from 'jsonwebtoken'
import type UsrType from '../types/usr.types'

const generateAccessToken = (user: UsrType): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_SECRET), {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null
        ? String(process.env.JWT_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: UsrType): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

export { generateAccessToken, generateRefreshToken }
