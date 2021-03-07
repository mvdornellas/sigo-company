import { Company } from '#enterprise/domain/company'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { CompanyDto } from '#application/dto/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class GetAllCompanyUseCase implements UseCaseBase<CompanyDto[]> {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (): Promise<CompanyDto[]> {
    const companies = await this.companyRepository.getAll()
    return companies.map(({ id, name, cnpj, email, endHire, startHire, createdAt, updatedAt }: Company) => {
      return {
        id,
        name,
        cnpj,
        email,
        endHire,
        startHire,
        createdAt,
        updatedAt
      } as CompanyDto
    })

  }
}
