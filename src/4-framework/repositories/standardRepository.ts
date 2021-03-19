import { Service } from 'typedi'
import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Standard } from '#enterprise/domain/standard'
import { Model } from '#framework/models/model'
import { COMPANY_PK, COMPANY_ID } from '#framework/repositories/companyRepository'
export const STANDARD_SK = 'STANDARD'

@Service({ id: IStandardRepositoryToken })
export class StandardRepository implements IStandardRepository {
  async create (companyId: string, standards: Standard[]): Promise<Standard[]> {
    const standardsInserted = standards.map(({ id, name }: Standard) => {
      return {
        pk: COMPANY_PK,
        sk: `${COMPANY_ID}#${companyId}#${STANDARD_SK}#${id}`,
        id,
        name,
        rating: 0,
        createdAt: new Date().toISOString()
      }
    })

    return Model.batchPut(standardsInserted)
  }

  async getAll (companyId: string): Promise<Standard[]> {
    return Model.query('pk')
    .eq(COMPANY_PK)
    .where('sk')
    .beginsWith(`${COMPANY_ID}#${companyId}#${STANDARD_SK}`)
    .exec()
  }

  async update (companyId: string, { rating, id: standardId }: Standard): Promise<Standard> {
    return Model.update({
      pk: COMPANY_PK,
      sk: `${COMPANY_ID}#${companyId}#${STANDARD_SK}#${standardId}`
    }, {
      rating,
      updatedAt: new Date().toISOString()
    })
  }
}
