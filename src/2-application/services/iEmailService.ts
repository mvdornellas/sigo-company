import { Token } from 'typedi/Token'

export interface IEmailService {
  send (email: string, options: {}): Promise<boolean>
}

export const IEmailServiceToken = new Token<IEmailService>()
