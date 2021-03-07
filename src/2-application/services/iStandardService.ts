import { Token } from 'typedi/Token'

export interface IStandardService {
  create (standard: any): Promise<any>
}

export const IStandardServiceToken = new Token<IStandardService>()
