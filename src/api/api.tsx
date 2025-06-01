import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/constants'

class Api {
  uri: string

  constructor(uri: string) {
    this.uri = uri
  }

  protected async request(
    method: string,
    path = '',
    data?: object,
    headers: Record<string, string> = {}
  ) {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/${this.uri}${path}`

    const token = Cookies.get(ACCESS_TOKEN)
    const authHeaders: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {}

    // Don't set Content-Type for FormData, let the browser set it with boundary
    const mergedHeaders: Record<string, string> = {
      ...headers,
      ...authHeaders,
    }

    // Only set Content-Type for non-FormData requests
    if (!(data instanceof FormData)) {
      mergedHeaders['Content-Type'] = 'application/json'
    }

    const options: RequestInit = {
      method,
      headers: mergedHeaders,
      ...(method === 'GET'
        ? { body: undefined }
        : {
            body: data instanceof FormData ? data : JSON.stringify(data),
          }),
    }

    try {
      const response = await fetch(url, options)
      return await response.json()
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  get(query: object) {
    return this.request('GET', '', query)
  }

  getById(id: string | number) {
    return this.request('GET', `/${id}`)
  }

  create(resource: object) {
    return this.request('POST', '', resource)
  }

  update(id: string | number, resource: object) {
    return this.request('PUT', `/${id}`, resource)
  }

  destroy(id: string | number) {
    return this.request('DELETE', `/${id}`)
  }
}

export default Api
