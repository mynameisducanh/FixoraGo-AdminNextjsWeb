import { useState, useEffect } from 'react'
import RevenueManagerApi from '@/api/revenueManagerApi'
import UserApi from '@/api/userApi'
import { formatCurrency } from '@/utils/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface RecentBill {
  id: string
  firstname: string
  username: string
  lastname: string
  fullName: string
  emailVerified: number
  email: string
  avatarurl:string
  roles: string
  address: string
  phonenumber: string
  createAt: number
}

export function RecentRegister() {
  const userApi = new UserApi()
  const [recentBills, setRecentBills] = useState<RecentBill[]>([])

  const fetchData = async () => {
    try {
      const res = await userApi.getAllUser()
      if (res) {
        setRecentBills(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='space-y-8'>
      {recentBills.slice(0, 6).map((bill, index) => (
        <div key={index} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            {bill.avatarurl ? (
              <AvatarImage src={`${bill.avatarurl}`} alt='Avatar' />
            ) : (
              <>
                <AvatarImage
                  src={`/avatars/${String(index + 1).padStart(2, '0')}.png`}
                  alt='Avatar'
                />
                <AvatarFallback>
                  {bill.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {bill.username}
              </p>
              <p className='text-muted-foreground text-sm'>{bill.email}</p>
            </div>
            <div className='font-medium'>
              {bill.roles}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
