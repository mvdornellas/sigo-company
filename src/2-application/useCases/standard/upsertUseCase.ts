import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { Inject, Service } from 'typedi'
import { StandardDto } from '#application/dto/standard'
import { Standard } from '#enterprise/domain/standard'

@Service()
export class UpsertStandardUseCase {
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository

  async run ({ companyId, standards }: { companyId: string, standards: StandardDto[]}): Promise<StandardDto[]> {
    const standardsUpserted = await this.standardRepository.upsert(companyId, standards.map(standard => new Standard(standard)))
    return standardsUpserted.map(standard => new StandardDto(standard))
  }

}
