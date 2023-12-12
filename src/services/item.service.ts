import prisma from '../utils/client'

export const getItem = async (): Promise<any> => {
  const data = await prisma.item.findMany()
  return data
}
