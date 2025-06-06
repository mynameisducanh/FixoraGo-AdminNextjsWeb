import { useState, useEffect } from 'react'
import RevenueManagerApi from '@/api/revenueManagerApi'
import { formatCurrency } from '@/utils/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface RecentBill {
  user: {
    username: string
    email: string
    avatarUrl: string
  }
  totalRevenue: string
}

export function RecentSales() {
  const revenueManagerApi = new RevenueManagerApi()
  const [recentBills, setRecentBills] = useState<RecentBill[]>([])

  const fetchData = async () => {
    try {
      const res = await revenueManagerApi.getRecentBills()
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
      {recentBills.slice(0,6).map((bill, index) => (
        <div key={index} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            {bill.user.avatarUrl ? (
              <AvatarImage src={`${bill.user.avatarUrl}`} alt='Avatar' />
            ) : (
              <>
                <AvatarImage
                  src={`/avatars/${String(index + 1).padStart(2, '0')}.png`}
                  alt='Avatar'
                />
                <AvatarFallback>
                  {bill.user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {bill.user.username}
              </p>
              <p className='text-muted-foreground text-sm'>{bill.user.email}</p>
            </div>
            <div className='font-medium'>
              +{formatCurrency(Number(bill.totalRevenue))}đ
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
