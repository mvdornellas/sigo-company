import 'reflect-metadata'
import { ComplianceController } from '#adapter/controllers/complianceController'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'

export const handler: Handler = async (_event: APIGatewayEvent) => {
  const complianceController = Container.get(ComplianceController)
  return builder.response(await complianceController.getAllCompanyItems())
}
