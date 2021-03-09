import { INotificationService, INotificationServiceToken } from '#application/services/iNotificationService'
import { SNS } from 'aws-sdk'
import { Service } from 'typedi'

@Service({ id: INotificationServiceToken })
export class NotificationService implements INotificationService {
  private readonly resource: SNS
  constructor () {
    this.resource = new SNS()
  }

  async send (message: string): Promise<void> {
    const params = {
      Message: message,
      TopicArn: process.env.COMPANY_CREATED_SNS
    }
    console.log(`[I] SEND NOTIFICATION PARAMS`, params)
    return new Promise<any>((resolve, reject) => {
      this.resource.publish(params, (err, data) => {
        if (err) {
          const errorString = JSON.stringify(err)
          console.error(`[E] ERROR SEND NOTIFICATION`, errorString)
          return reject(errorString)
        } else {
          const dataString = JSON.stringify(data)
          console.log(`[I] SEND NOTIFICATION SUCESS DATA`, dataString)
          return resolve(dataString)
        }
      })
    })

  }
}
