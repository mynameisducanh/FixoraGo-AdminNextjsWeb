import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, USER_STORAGE_KEY } from '@/constants'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const token = Cookies.get(ACCESS_TOKEN)
    const storedUser = Cookies.get(USER_STORAGE_KEY)
    
    if (!token || !storedUser) {
      throw redirect({
        to: '/sign-in',
      })
    }

    try {
      const user = JSON.parse(storedUser)
      if (user.roles !== 'system_admin') {
        throw redirect({
          to: '/401',
        })
      }
    } catch (error) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
  component: AuthenticatedLayout,
})
