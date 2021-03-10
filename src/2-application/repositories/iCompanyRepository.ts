import { Company } from '#enterprise/domain/company'
import { Token } from 'typedi/Token'

export interface ICompanyRepository {
  create (company: Company): Promise<Company>
  getAll (): Promise<Company[]>
  delete (id: string): Promise<void>
}

export const ICompanyRepositoryToken = new Token<ICompanyRepository>()
