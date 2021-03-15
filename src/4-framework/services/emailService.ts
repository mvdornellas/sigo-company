import { IEmailService, IEmailServiceToken } from '#application/services/iEmailService'
import { SES } from 'aws-sdk'
import { Service } from 'typedi'

@Service({ id: IEmailServiceToken })
export class EmailService implements IEmailService {
  private readonly resource: SES
  constructor () {
    this.resource = new SES()
  }
  async sendHTML (source: string, destination: string[], message: {
    subject: string,
    content: string
  }): Promise<boolean> {

    const { subject, content } = message

    const emailSended = await this.resource.sendEmail({
        Source: source,
        Destination: {
            ToAddresses: [...destination]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: content,
                    Charset: 'UTF-8'
                }
            }
        }
    }).promise()

    console.info('[I] EMAIL SEND RESPONSE', emailSended)

    if (emailSended.$response.error) {
      console.log('[E] EMAIL ERROR', emailSended.$response.error)
      return false
    }

    return true
  }

}
