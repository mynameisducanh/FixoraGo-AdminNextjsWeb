import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { NewsTable } from "@/features/news/components/news-table";
import { NewsDialog } from "@/features/news/components/news-dialog";
import UsersProvider from "@/features/news/context/users-context";
import { NewsInterface } from "@/types";
import { useEffect, useState } from "react";
import { columns } from './components/news-column'
import NewsApi from "@/api/newsApi";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default function News() {
  const newApi = new NewsApi()
  const [dataNews, setDataNews] = useState<NewsInterface[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await newApi.getAll();
        if(res){
          setDataNews(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataUser();
  }, []);

  return(
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
            <h2 className='text-2xl font-bold tracking-tight'>News List</h2>
            <p className='text-muted-foreground'>
              Manage News List
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <IconPlus className="mr-2 h-4 w-4" />
            Create News
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <NewsTable data={dataNews} columns={columns}/>
        </div>
      </Main>

      <NewsDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </UsersProvider>
  )
}