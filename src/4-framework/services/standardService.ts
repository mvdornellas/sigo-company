import { Service } from 'typedi'
import { IStandardService, IStandardServiceToken } from '#application/services/iStandardService'

@Service({ id: IStandardServiceToken })
export class StandardRepository implements IStandardService {
  async create (company: any): Promise<any> {
    const id = `COMPANY#${company.id}`
  }
}
