import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Inject, Service } from 'typedi'
import { StandardDto } from '#application/dto/standard'
import { Standard } from '#enterprise/domain/standard'

@Service()
export class CreateStandardUseCase {
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository

  async run ({ companyId, standards }: { companyId: string, standards: StandardDto[] }): Promise<StandardDto[]> {
    return this.standardRepository.create(companyId, standards.map(st => new Standard(st)))
  }

}
