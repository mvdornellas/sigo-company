import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'
import { ComplianceController } from '#adapter/controllers/complianceController'
import { AssessInput } from '#adapter/serializers/compliance/assessInput'
import { StandardDto } from '#application/dto/standard'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const companyId = event.pathParameters!.companyId
  if (!companyId) {
    return builder.response({
      success: false,
      data: {},
      errors: 'companyId is required'
    })
  }
  const body = JSON.parse(event.body || '{}')
  console.log(`[I] BODY REQUEST`, body)
  const complianceController = Container.get(ComplianceController)
  return builder.response(await complianceController.assess(new AssessInput({
    companyId,
    standards: body.standards.map((standard: any) => new StandardDto(standard))
  })))
}
