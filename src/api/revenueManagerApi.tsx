import Api from '@/api/api'

class RevenueManagerApi extends Api {
  constructor() {
    super('revenue-manager')
  }

  async getForYear(year: string) {
    return this.request('get', `/statistics/yearly?year=${year}`)
  }

  async getRecentBills() {
    return this.request('get', `/recent/bills`)
  }
}

export default RevenueManagerApi
