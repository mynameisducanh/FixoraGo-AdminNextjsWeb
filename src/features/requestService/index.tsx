import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
// import { RequestServiceDialogs } from './components/request-service-dialogs' 
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import { RequestServicesProvider, useRequestServices } from './context/request-services-context'
import { RequestServiceDetailDialog } from './components/request-service-detail-dialog'
import { RequestConfirmDialog } from './components/request-confirm-dialog'
import { useEffect, useState } from 'react'
import { RequestServiceInterface } from '@/types'
import RequestServiceApi from '@/api/requestService'
// import { users } from './data/users'

function RequestServiceContent() {
  const requestServiceApi = new RequestServiceApi()
  const [dataUser, setDataUser] = useState<RequestServiceInterface[]>([])
  const { open, setOpen, currentRow } = useRequestServices()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await requestServiceApi.getAll();
        if(res){
          setDataUser(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
    <>
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
            <h2 className='text-2xl font-bold tracking-tight'>Request Service List</h2>
            <p className='text-muted-foreground'>
              Manage Request Service List here.
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={dataUser} columns={columns} />
        </div>
      </Main>

      {currentRow && (
        <>
          <RequestServiceDetailDialog
            open={open === 'detail'}
            onOpenChange={(open) => setOpen(open ? 'detail' : null)}
            currentRow={currentRow}
          />
          <RequestConfirmDialog
            open={open === 'confirm'}
            onOpenChange={(open) => setOpen(open ? 'confirm' : null)}
            requestId={currentRow.id}
          />
        </>
      )}
    </>
  )
}

export default function RequestService() {
  return (
    <RequestServicesProvider>
      <RequestServiceContent />
    </RequestServicesProvider>
  )
}
