import { Standard } from '#enterprise/domain/standard'
import { Token } from 'typedi/Token'

export interface IStandardRepository {
  upsert (companyId: string, standards: Standard[]): Promise<Standard[]>
  getAll (companyId: string): Promise<Standard[]>
}

export const IStandardRepositoryToken = new Token<IStandardRepository>()
