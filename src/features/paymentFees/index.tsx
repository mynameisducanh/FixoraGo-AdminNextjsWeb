import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { useEffect, useState } from 'react'
import { PaymentFeesInterface } from '@/types'
import RevenueManagerApi from '@/api/revenueManagerApi'

export default function PaymentFees() {
  const revenueManagerApi = new RevenueManagerApi()
  const [dataUser, setDataUser] = useState<PaymentFeesInterface[]>([])

 useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await revenueManagerApi.getAllStaffPayfees();
        if(res){
          setDataUser(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataUser();
  }, []);
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
            <h2 className='text-2xl font-bold tracking-tight'>Payment Fees List</h2>
            <p className='text-muted-foreground'>
              Manage Payment Fees List for Fixer
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={dataUser} columns={columns} />
        </div>
      </Main>

    </UsersProvider>
  )
}
