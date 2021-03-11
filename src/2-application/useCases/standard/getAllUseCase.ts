import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Inject, Service } from 'typedi'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { StandardDto } from '#application/dto/standard'

@Service()
export class GetAllStandardUseCase implements UseCaseBase<StandardDto[]> {
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository

  async run (companyId: string): Promise<StandardDto[]> {
    const standards = await this.standardRepository.getAll(companyId)
    return standards.map(standard => new StandardDto(standard))
  }
}
