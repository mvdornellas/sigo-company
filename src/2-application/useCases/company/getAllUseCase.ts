import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { CompanyDto, StandardDto } from '#application/dto/company'

@Service()
export class GetAllCompanyUseCase {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (): Promise<CompanyDto[]> {
    const companies = await this.companyRepository.getAll()
    return _.chain(companies)
    .groupBy('companyId')
    .map((value, _key) => {
      const { companyId, name, email, cnpj, startHire, endHire } = value[0]
      return {
        id: companyId,
        name,
        email,
        cnpj,
        startHire,
        endHire,
        standards: value.map(company => {
          return {
            id: company.standardId,
            name: company.standardName,
            rating: company.rating
          } as StandardDto
        })
      } as CompanyDto
    })
    .value()
  }
}
