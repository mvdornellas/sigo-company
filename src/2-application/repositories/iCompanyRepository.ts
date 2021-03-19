import { Company } from '#enterprise/domain/company'
import { Token } from 'typedi/Token'

export interface ICompanyRepository {
  create (company: Company): Promise<Company>
  getAllDetails (): Promise<Company[]>
  getAllItems (): Promise<Company[]>
  get (companyId: string): Promise<Company>
  delete (id: string): Promise<void>
  updateComplianceAssessed (id: string): Promise<Company>
}

export const ICompanyRepositoryToken = new Token<ICompanyRepository>()
