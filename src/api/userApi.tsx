import Api from '@/api/api'

class UserApi extends Api {
  constructor() {
    super('users')
  }

  async me() {
    return this.request('get', `/me`)
  }

  async createUser(data: any) {
    return this.request('post', `/`, data)
  }

  async getByUserId(id: string) {
    return this.request('get', `/${id}`)
  }

  async updateUser(data: any, id: string) {
    return this.request('PATCH', `/profile/${id}`, data, {
      'Content-Type': 'multipart/form-data',
    })
  }

  async getAllUser() {
    return this.request('get', `/`)
  }
}

export default UserApi
