export default interface UserType {
  id: string
  email: string
  name: string
  password: string
  confirmPassword?: string
  role: string
}
