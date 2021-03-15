import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Inject, Service } from 'typedi'
import { StandardDto } from '#application/dto/standard'

@Service()
export class UpdateStandardUseCase {
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository

  async run ({ companyId, standard }: { companyId: string, standard: StandardDto }): Promise<StandardDto> {
    return this.standardRepository.update(companyId, new StandardDto(standard))
  }

}
