import { CreateStandardUseCase } from '#application/useCases/standard/createUseCase'
import { OutputBase } from '#adapter/outputBase'
import { GetAllStandardOutput } from '#adapter/serializers/standard/getAllOutput'
import { GetAllStandardUseCase } from '#application/useCases/standard/getAllUseCase'
import { Inject, Service } from 'typedi'

@Service()
export class StandardController {
  @Inject() private readonly getAllStandardUseCase!: GetAllStandardUseCase
  @Inject() protected readonly createStandardUseCase!: CreateStandardUseCase

  async getAll (companyId: string): Promise<OutputBase<GetAllStandardOutput[]>> {
    try {
      const standards = await this.getAllStandardUseCase.run(companyId)
      console.info('[I] STANDARDS DATA', standards)
      return new OutputBase<GetAllStandardOutput[]>({
        data: standards.map(standard => new GetAllStandardOutput(standard))
      })
    } catch (error) {
      console.error(`[E] GET ALL STANDARDS`, error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }
  }

}
