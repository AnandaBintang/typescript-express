import bcrypt from 'bcrypt'

const saltRounds = 10

const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds)
}

const verify = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export { encrypt, verify }
