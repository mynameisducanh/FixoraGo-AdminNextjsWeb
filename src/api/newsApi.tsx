import { NewsInterface } from '@/types'
import Api from '@/api/api'
import Cookies from 'js-cookie'

class NewsApi extends Api {
  constructor() {
    super('news')
  }

  async getAll() {
    return this.request('get', '/')
  }

  async create(data: FormData) {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/${this.uri}`
    
    const response = await fetch(url, {
      method: 'POST',
      body: data
    })
    
    return response.json()
  }

  async verifyOtp(email: string, otp: string) {
    return this.request('post', '/validate', { email, otp })
  }
}

export default NewsApi
