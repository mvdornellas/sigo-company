import { IEmailService, IEmailServiceToken } from '#application/services/iEmailService'
import { SES } from 'aws-sdk'
import { Inject } from 'typedi'

@Inject(IEmailServiceToken)
export class EmailService implements IEmailService {
  private readonly resource: SES
  constructor () {
    this.resource = new SES()
  }
  async send (email: string, options: {
    message: {
      title: ''
      body: ''
    }
  }): Promise<boolean> {
    const emailSended = await this.resource.sendEmail({
        Source: 'dornellas13@gmail.com',
        Destination: {
            ToAddresses: ['']
        },
        Message: {
            Subject: {
                Data: '',
                Charset: ''
            },
            Body: {
                Html: {
                    Data: '',
                    Charset: ''
                }
            }
        }
    }).promise()

    console.info('[I] EMAIL SEND DATA', email)

    if (emailSended.$response.error) {
      return false
    }
    return true
  }

}
