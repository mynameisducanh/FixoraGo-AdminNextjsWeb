import Api from './api'

class ActivityLogApi extends Api {
  constructor() {
    super('activity-logs')
  }

  async createRes(data: any) {
    return this.request('POST', '', data, {
      'Content-Type': 'multipart/form-data',
    })
  }

  async CheckFixerCheckIn(fixerId: string) {
    return this.request('GET', `/check-fixer-checkin/${fixerId}`)
  }

  async getById(id: string) {
    return this.request('GET', `/${id}`)
  }

  async getAllByFilter(params: any) {
    return this.request(
      'GET',
      `/all/byFilter?type=${params.type}&sorttime=${params.sorttime}&activityType=${params.activityType}`
    )
  }
}

export default ActivityLogApi
