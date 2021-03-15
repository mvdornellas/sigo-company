import { Token } from 'typedi/Token'

export interface IEmailService {
  sendHTML (source: string, destination: string[], message: {
    subject: string,
    content: string
  }): Promise<boolean>
}

export const IEmailServiceToken = new Token<IEmailService>()
