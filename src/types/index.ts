export interface UserInterface {
  createAt: string
  deleteAt: string | null
  email: string
  emailVerified: number
  phonenumber: string
  address: string
  authdata: string
  firstname: string
  fullName: string
  id: string
  lastname: string
  roles: string
  updateAt: string
  username: string
}

export interface SignInInterface {
  username: string
  password: string
}

export interface RegisterInterface {
  username: string
  email: string
  password: string
  confirmPassword: string
}
