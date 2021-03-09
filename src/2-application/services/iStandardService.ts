import { Token } from 'typedi/Token'

export interface IStandardService {
  create (companyId: number, standards: [{
    id: string,
    name: string
  }]): Promise<any>
}

export const IStandardServiceToken = new Token<IStandardService>()
