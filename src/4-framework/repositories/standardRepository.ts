import { Service } from 'typedi'
import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Standard } from '#enterprise/domain/standard'
import { StandardModel } from '#framework/models/standardModel'
import { COMPANY_PK } from '#framework/repositories/companyRepository'

export const STANDARD_SK = 'STANDARD'

@Service({ id: IStandardRepositoryToken })
export class StandardRepository implements IStandardRepository {
  async upsert (companyId: string, standards: Standard[]): Promise<Standard[]> {
    const standardsMapped = standards.map(standard => {
      return {
        pk: `${COMPANY_PK}#${companyId}`,
        sk: `${STANDARD_SK}#${standard.id}`,
        ...standard
      }
    })
    await StandardModel.batchPut(standardsMapped)
    return standardsMapped
  }

  async getAll (companyId: string): Promise<Standard[]> {
    return StandardModel.query('pk')
    .eq(`${COMPANY_PK}#${companyId}`)
    .where('sk')
    .beginsWith(`${STANDARD_SK}`)
    // .filter('name')
    // .ascending()
    .exec()
  }
}
