import { Token } from 'typedi/Token'

export interface IEmailService {
  send (): void
}

export const IEmailServiceToken = new Token<IEmailService>()
