import 'reflect-metadata'
import { Handler, SQSEvent } from 'aws-lambda'
import Container from 'typedi'
import { SendEmailComplianceInput } from '#adapter/serializers/compliance/sendEmailInput'
import { ComplianceController } from '#adapter/controllers/complianceController'

export const handler: Handler = async (event: SQSEvent) => {
  const record = event.Records[0]
  console.info('[I] RECORD QUEUE DATA', record)
  const body = JSON.parse(record.body || '{}')
  console.info('[I] RECORD QUEUE BODY', body)
  const message = JSON.parse(body.Message)
  console.info('[I] RECORD QUEUE MESSAGE', message)
  const complianceController = Container.get(ComplianceController)
  return complianceController.sendEmail(new SendEmailComplianceInput(message))
}
