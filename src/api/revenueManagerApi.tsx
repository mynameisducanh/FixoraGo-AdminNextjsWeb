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

  async getAllStaffPayfees() {
    return this.request('get', `/all/staff-payfees`)
  }

  async confirmBill2(id: string, body: any) {
    return this.request('PATCH', `/${id}/status`, body)
  }
}

export default RevenueManagerApi
