import type UserType from '../types/user.types'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<any> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    }
  })

  return data
}

export const findAllUser = async (): Promise<any> => {
  const data = await prisma.user.findMany()

  return data
}

export const findUserById = async (id: string): Promise<any> => {
  const data = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return data
}

export const findUserByEmail = async (email: string): Promise<any> => {
  const data = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return data
}

export const deleteUserById = async (id: string): Promise<any> => {
  const data = await prisma.user.delete({
    where: {
      id
    }
  })

  return data
}

export const userLogin = async (payload: UserType): Promise<any> => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })

  return data
}
