import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class DeleteCompanyUseCase implements UseCaseBase<void> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (companyId: string): Promise<void> {
    console.info('[I] DELETE COMPANY BY',companyId)
    await this.companyRepository.delete(companyId)
  }
}
