import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Inject, Service } from 'typedi'
import { StandardDto } from '#application/dto/standard'

@Service()
export class CreateStandardUseCase {
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository

  async run ({ companyId, standard }: { companyId: string, standard: StandardDto}): Promise<StandardDto> {
    return this.standardRepository.create(companyId, new StandardDto(standard))
  }

}
