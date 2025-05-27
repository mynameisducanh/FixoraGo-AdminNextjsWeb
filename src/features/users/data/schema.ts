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
