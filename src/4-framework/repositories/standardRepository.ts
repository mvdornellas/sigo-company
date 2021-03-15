import { Service } from 'typedi'
import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Standard } from '#enterprise/domain/standard'
import { StandardModel } from '#framework/models/standardModel'
import { COMPANY_PK } from '#framework/repositories/companyRepository'

export const STANDARD_SK = 'STANDARD'

@Service({ id: IStandardRepositoryToken })
export class StandardRepository implements IStandardRepository {
  async create (companyId: string, standard: Standard): Promise<Standard> {
    const { id,name } = standard
    return StandardModel.create({
      pk: `${COMPANY_PK}#${companyId}`,
      sk: `${STANDARD_SK}#${standard.id}`,
      id,
      name,
      createdAt: new Date().toISOString()
    })
  }

  async getAll (companyId: string): Promise<Standard[]> {
    return StandardModel.query('pk')
    .eq(`${COMPANY_PK}#${companyId}`)
    .where('sk')
    .beginsWith(`${STANDARD_SK}`)
    .exec()
  }

  async update (companyId: string, { rating, id: standardId }: Standard): Promise<Standard> {
    return StandardModel.update({
      pk: `${COMPANY_PK}#${companyId}`,
      sk: `${STANDARD_SK}#${standardId}`
    }, {
      rating,
      updatedAt: new Date().toISOString()
    })
  }
}
