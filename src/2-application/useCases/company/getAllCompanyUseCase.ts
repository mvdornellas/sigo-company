import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import { CompanyDto } from '#application/dto/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class GetAllCompanyUseCase implements UseCaseBase<CompanyDto[]> {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (): Promise<CompanyDto[]> {
    const companies = await this.companyRepository.getAllItems()
    return companies.map(company => new CompanyDto(company))

  }
}
