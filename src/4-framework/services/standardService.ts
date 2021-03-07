import { Service } from 'typedi'
import { IStandardService, IStandardServiceToken } from '#application/services/iStandardService'

@Service({ id: IStandardServiceToken })
export class StandardRepository implements IStandardService {
  async create (standard: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

}
