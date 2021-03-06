import { Service } from 'typedi'
import { CompanyModel } from '#framework/models/companyModel'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Company } from '#enterprise/domain/company'

@Service({ id: ICompanyRepositoryToken })
export class CompanyRepository implements ICompanyRepository {
  async create (company: Company): Promise<Company> {
    return CompanyModel.create(company)
  }
  async update (id: string, standardId: string, newCompany: Company): Promise<Company> {
    return CompanyModel.update({
      companyId: id,
      standardId: standardId
    }, newCompany)
  }

  async getAll (): Promise<Company[]> {
    return CompanyModel.scan().all().exec()
  }

}
