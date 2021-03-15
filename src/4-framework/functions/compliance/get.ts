import 'reflect-metadata'
import { ComplianceController } from '#adapter/controllers/complianceController'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const companyId = event.pathParameters!.companyId
  if (!companyId) {
    return builder.response({
      success: false,
      data: {},
      errors: 'companyId is required'
    })
  }
  const complianceController = Container.get(ComplianceController)
  return builder.response(await complianceController.get(companyId))
}
