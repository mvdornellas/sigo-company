import { Service } from 'typedi'
import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Standard } from '#enterprise/domain/standard'
import { StandardModel } from '#framework/models/standardModel'

@Service({ id: IStandardRepositoryToken })
export class StandardRepository implements IStandardRepository {
  async create (companyId: string, standards: Standard[]): Promise<Standard[]> {
    const standardsMapped = standards.map(standard => {
      console.log(`STANDARD`,standard)
      return {
        pk: `COMPANY#${companyId}`,
        sk: `STANDARD#${standard.id}`,
        ...standard
      }
    })

    console.info(`[I] STANDARDS TO SAVE ON COMPANY ${companyId}`, standardsMapped)
    const standardsCreated = await StandardModel.batchPut(standardsMapped)
    return standardsCreated.map(standard => standard)
  }
}
