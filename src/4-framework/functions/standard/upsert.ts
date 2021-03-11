import { StandardController } from '#adapter/controllers/standardController'
import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'
import { UpsertStandard } from '#adapter/serializers/standard/upsert'

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
  const standardController = Container.get(StandardController)
  return builder.response(await standardController.upsert(companyId, body.standards.map((standard: any) => new UpsertStandard(standard))))
}
