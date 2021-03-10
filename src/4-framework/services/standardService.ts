import { BaseService, SERVICES } from '#framework/services/baseService'
import { Service } from 'typedi'
import { IStandardService, IStandardServiceToken } from '#application/services/iStandardService'

@Service({ id: IStandardServiceToken })
export class StandardService extends BaseService implements IStandardService {
  constructor () {
    super(SERVICES.STANDARD)
  }
  async create (companyId: number, standards: [{
    id: string,
    name: string
  }]): Promise<any> {
    return this.axios.post<boolean>(`/standard`, {
      companyId,
      standards
    })
  }

}
