import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'

@Service()
export class CreateCompanyUseCase {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run ({
      id,
      cnpj,
      email,
      endHire,
      name,
      startHire,
      standards
  }: CompanyDto): Promise<boolean> {
    for (const standard of standards) {
      const company = {
        companyId: id,
        standardId: standard.id,
        standardName: standard.name,
        cnpj,
        email,
        startHire,
        endHire,
        name
      } as Company
      await this.companyRepository.create(company)
    }

    return true
  }
}
