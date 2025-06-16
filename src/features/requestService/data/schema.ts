import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('system_admin'),
  z.literal('system_fixer'),
  z.literal('system_user'),
])

const userSchema = z.object({
  id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  fullName: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phonenumber: z.string().optional(),
  emailVerified: z.number().optional(),
  infoVerified: z.number().optional(),
  roles: userRoleSchema,
  address: z.string().optional(),
  createAt: z.number().optional(),
  updateAt: z.number().nullable(),
  deleteAt: z.number().nullable(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)

const requestServiceStatusSchema = z.union([
  z.literal('pending'),
  z.literal('completed'),
  z.literal('cancelled'),
  z.literal('in_progress')
])

const requestServiceUserSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  avatarUrl: z.string()
})

const requestServiceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  fixerId: z.string().nullable(),
  nameService: z.string(),
  listDetailService: z.string(),
  priceService: z.string(),
  typeEquipment: z.string(),
  bonus: z.string().nullable(),
  note: z.string(),
  status: requestServiceStatusSchema,
  calender: z.string(),
  address: z.string(),
  fileImage: z.string().nullable(),
  createAt: z.number(),
  updateAt: z.number(),
  deleteAt: z.number().nullable(),
  temp: z.string().nullable(),
  user: requestServiceUserSchema,
  fixer: requestServiceUserSchema.nullable()
})

export type RequestService = z.infer<typeof requestServiceSchema>
export const requestServiceListSchema = z.array(requestServiceSchema)
