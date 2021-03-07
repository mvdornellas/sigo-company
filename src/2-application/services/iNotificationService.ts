import { Token } from 'typedi/Token'

export interface INotificationService {
  send (message: string): Promise<void>
}

export const INotificationServiceToken = new Token<INotificationService>()
