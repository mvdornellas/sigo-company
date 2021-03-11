import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import { CompanyDto } from '#application/dto/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class GetCompanyUseCase implements UseCaseBase<CompanyDto> {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (companyId: string): Promise<CompanyDto> {
    const company = await this.companyRepository.get(companyId)
    return new CompanyDto(company)

  }
}
