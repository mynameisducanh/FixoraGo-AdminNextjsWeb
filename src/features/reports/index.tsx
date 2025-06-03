import { useEffect, useState } from 'react'
import { ActivityLogInterface, PaymentFeesInterface } from '@/types'
import ActivityLogApi from '@/api/activityLogApi'
import RevenueManagerApi from '@/api/revenueManagerApi'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'

export default function Reports() {
  const revenueManagerApi = new RevenueManagerApi()
  const activityLogApi = new ActivityLogApi()
  const [dataUser, setDataUser] = useState<ActivityLogInterface[]>([])
  const filter = {
    type:'report',
    sorttime: 'newest',
    activityType:''
  }
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await activityLogApi.getAllByFilter(filter)
        console.log(res)
        if (res) {
          setDataUser(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataUser()
  }, [])
  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Reports List
            </h2>
            <p className='text-muted-foreground'>
              Manage Reports List for User
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={dataUser} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
