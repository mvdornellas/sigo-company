import { Standard } from '#enterprise/domain/standard'
import { Token } from 'typedi/Token'

export interface IStandardRepository {
  create (companyId: string, standards: Standard[]): Promise<Standard[]>
  update (companyId: string, standard: Standard): Promise<Standard>
  getAll (companyId: string): Promise<Standard[]>
}

export const IStandardRepositoryToken = new Token<IStandardRepository>()
