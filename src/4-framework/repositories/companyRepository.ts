import { Service } from 'typedi'
import { CompanyModel } from '#framework/models/companyModel'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Company } from '#enterprise/domain/company'

export const COMPANY_PK = 'COMPANY'
export const COMPANY_SK = 'DETAILS'

@Service({ id: ICompanyRepositoryToken })
export class CompanyRepository implements ICompanyRepository {
  async create ({ id, name, email, cnpj, startHire, endHire }: Company): Promise<Company> {
    return CompanyModel.create({
      pk: `${COMPANY_PK}#${id}`,
      sk: `${COMPANY_SK}`,
      id,
      name,
      email,
      cnpj,
      startHire,
      endHire
    })
  }

  async delete (id: string): Promise<void> {
    return CompanyModel.delete({
      pk: `${COMPANY_PK}#${id}`,
      sk: `${COMPANY_SK}`
    })
  }

  async getAll (): Promise<Company[]> {
    return CompanyModel.scan({
      pk: {
        'begins_with': `${COMPANY_PK}`
      },
      sk: {
        'begins_with': `${COMPANY_SK}`
      }
    })
    .all()
    .exec()
  }

  async get (companyId: string): Promise<Company> {
    return CompanyModel.queryOne('pk').eq(`${COMPANY_PK}#${companyId}`).where('sk').eq(COMPANY_SK).exec()
  }

}
