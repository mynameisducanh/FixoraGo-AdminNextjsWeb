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

export interface PaymentFeesInterface {
  createAt: string
  updateAt: string
  deleteAt: string | null
  id: string
  userId: string
  expires: string | null
  totalRevenue: string
  paidFees: string
  unpaidFees: string
  note: string | null
  status: string
  activityId: string
  temp: string
  user: {
    fullName: string
    username: string
    email: string
  }
}

export interface ActivityLogInterface {
  createAt: string | null
  updateAt: string | null
  deleteAt: string | null
  id: string
  activityType: string
  fixerId: string | null
  userId: string
  requestServiceId: string | null
  requestConfirmId: string | null
  note: string
  imageUrl: string
  address: string | null
  latitude: number | null
  longitude: number | null
  temp: string | null
  user: {
    fullName: string
    username: string
    email: string
    avatarUrl: string
  }
  fixer: {
    fullName: string
    username: string
    email: string
    avatarUrl: string
  }
}

export interface NewsInterface {
  id: string
  title: string
  content: string
  image: string
  description: string
  createdAt: string
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

export interface RequestServiceInterface {
  id: string
  userId: string
  fixerId: string | null
  nameService: string
  listDetailService: string
  priceService: string
  typeEquipment: string
  bonus: string | null
  note: string
  status: string
  calender: string
  address: string
  fileImage: string | null
  createAt: number
  updateAt: number
  deleteAt: string | null
  temp: string | null
  user: {
    username: string
    fullName: string
    avatarUrl: string
  }
  fixer: {
    username: string
    fullName: string
    avatarUrl: string
  }
}

export interface RequestConfirmInterface {
  id: string
  requestConfirmId: string
  name: string
  type: 'replace' | 'repair'
  price: string
  userAccept: string | null
  image: string
  note: string
  temp: string | null
  createAt: number
  updateAt: number
  deleteAt: number | null
}
