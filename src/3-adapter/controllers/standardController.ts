import { UpsertStandardUseCase } from '#application/useCases/standard/upsertUseCase'
import { OutputBase } from '#adapter/outputBase'
import { GetAllStandardOutput } from '#adapter/serializers/standard/getAllOutput'
import { UpsertStandard } from '#adapter/serializers/standard/upsert'
import { GetCompanyUseCase } from '#application/useCases/company/getUseCase'
import { GetAllStandardUseCase } from '#application/useCases/standard/getAllUseCase'
import { Inject, Service } from 'typedi'
import { StandardDto } from '#application/dto/standard'

@Service()
export class StandardController {
  @Inject() private readonly getCompanyUseCase!: GetCompanyUseCase
  @Inject() private readonly getAllStandardUseCase!: GetAllStandardUseCase
  @Inject() protected readonly upsertStandardUseCase!: UpsertStandardUseCase

  async getAll (companyId: string): Promise<OutputBase<GetAllStandardOutput[]>> {
    try {
      const company = await this.getCompanyUseCase.run(companyId)
      const standards = await this.getAllStandardUseCase.run(companyId)
      console.info('[I] STANDARDS DATA', standards)
      return new OutputBase({
        data: {
          company,
          standards: standards.map(standard => new GetAllStandardOutput(standard))
        }
      })
    } catch (error) {
      console.error(`[E] GET ALL STANDARDS`, error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }
  }

  async upsert (companyId: string, standards: UpsertStandard[]): Promise<OutputBase<any>> {
    try {
      const standardsUpserted = await this.upsertStandardUseCase.run({ companyId, standards: standards.map(standard => new StandardDto(standard)) })
      return new OutputBase({
        data: standardsUpserted.map(standard => new UpsertStandard(standard))
      })
    } catch (error) {
      console.error('[E] UPSERT STANDARDS', error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }
  }

}
