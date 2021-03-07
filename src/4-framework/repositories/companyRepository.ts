import { Service } from 'typedi'
import { CompanyModel } from '#framework/models/companyModel'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Company } from '#enterprise/domain/company'

@Service({ id: ICompanyRepositoryToken })
export class CompanyRepository implements ICompanyRepository {
  async create (company: Company): Promise<Company> {
    return CompanyModel.create({
      pk: `COMPANY#${company.id}`,
      sk: `PROFILE#${company.id}`,
      ...company
    })
  }

  async getAll (): Promise<Company[]> {
    return CompanyModel.scan('sk').beginsWith('PROFILE#').all().exec()
  }

}
