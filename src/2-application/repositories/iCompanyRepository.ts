import { Company } from '#enterprise/domain/company'
import { Token } from 'typedi/Token'

export interface ICompanyRepository {
  create (company: Company): Promise<Company>
  update (id: string, standard: string, newCompany: Company): Promise<Company>
  getAll (): Promise<Company[]>
}

export const ICompanyRepositoryToken = new Token<ICompanyRepository>()
