import axios, { AxiosInstance } from 'axios'
export enum SERVICES {
  STANDARD = 1
}

export class BaseService {
  protected readonly axios!: AxiosInstance
  private readonly service: SERVICES
  constructor (service: SERVICES) {
    this.service = service
    this.axios = axios.create({
      baseURL: this.resolveBaseUrl()
    })
  }

  resolveBaseUrl () {
    switch (this.service) {
      case SERVICES.STANDARD:
        return `${process.env.STANDARD_BASE_URL}`
      default:
        throw new Error('[I] SERVICE NOT DEFINED')
        break
    }
  }
}
