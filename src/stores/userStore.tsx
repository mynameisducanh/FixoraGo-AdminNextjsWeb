import {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORAGE_KEY } from '@/constants'
import { router } from '@/main'
import { SignInInterface, UserInterface } from '@/types'
import AuthApi from '@/api/authApi'
import TokenApi from '@/api/tokenApi'
import UserApi from '@/api/userApi'
import axios from 'axios'

interface UserStoreContextType {
  user: UserInterface | null
  isAuthenticated: boolean
  login: (userData: SignInInterface) => Promise<any>
  logout: () => void
  fetchUserData: (token: string) => void
  loading: boolean
}

interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreContext = createContext<UserStoreContextType | undefined>(
  undefined
)
const authApi = new AuthApi()
const tokenApi = new TokenApi()
// const userApi = new UserApi()

export const useUserStore = () => {
  const context = useContext(UserStoreContext)
  if (!context) {
    throw new Error('useUserStore must be used within a UserStoreProvider')
  }
  return context
}

export const UserStoreProvider: FC<UserStoreProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async (token: string) => {
    try {
      const tokenLog = Cookies.get(ACCESS_TOKEN);
       const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || tokenLog}`,
          },
        }
      );
      console.log(response.data)
      if (response) {
        console.log('log in user-store', response.data)
        Cookies.set(USER_STORAGE_KEY, JSON.stringify(response.data))
        setUser(response.data)
        handleRedirectUser(response.data)
      }
    } catch (_error) {
      console.log('no login')
      // logout()
    }
  }

  const login = async (userSignIn: SignInInterface) => {
    const res = await authApi.login(userSignIn)
    if (res?.statusCode && res.statusCode !== 201) {
      return Promise.reject(res)
    } else {
      const { refreshToken, accessToken } = res
      Cookies.set(REFRESH_TOKEN, refreshToken)
      Cookies.set(ACCESS_TOKEN, accessToken)
      await fetchUserData(accessToken);
      return Promise.resolve(res)
    }
  }

  const logout = async () => {
    setUser(null)
    Cookies.remove(USER_STORAGE_KEY)
    Cookies.remove(REFRESH_TOKEN)
    Cookies.remove(ACCESS_TOKEN)
    router.navigate({ to: '/sign-in' })
  }

  const handleRedirectUser = (user: UserInterface) => {
    if (user.emailVerified === 0) {
      return
    }

    if (user.roles === 'system_user') {
      router.navigate({ to: '/401' })
    } else if (user.roles === 'system_fixer') {
      router.navigate({ to: '/401' })
    } else if (user.roles === 'system_admin') {
      router.navigate({ to: '/' })
    }
  }

  const checkToken = async () => {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN)
      if (refreshToken) {
        const res = await tokenApi.isValid(refreshToken)
        if (res) {
          const response = await tokenApi.accressToken(refreshToken)
          if (response) {
            Cookies.set(ACCESS_TOKEN, response.accessToken)
            fetchUserData(response)
          }
          return
        } else {
          logout()
        }
      }
    } catch (error) {
      console.error('Error while checking token:', error)
      logout()
    }
  }

  const isAuthenticated = user !== null

  useEffect(() => {
    const getStoredUser = async () => {
      await checkToken()
      const storedUser = Cookies.get(USER_STORAGE_KEY)
      if (storedUser) {
        const parsedUser: UserInterface = JSON.parse(storedUser)
        setUser(parsedUser)
      }
      setLoading(false)
    }

    getStoredUser()
  }, [])

  useEffect(() => {}, [loading, isAuthenticated])

  return (
    <UserStoreContext.Provider
      value={{ user, isAuthenticated, login, logout, fetchUserData, loading }}
    >
      {children}
    </UserStoreContext.Provider>
  )
}
