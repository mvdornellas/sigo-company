import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import responseBuilder from '#framework/common/responseBuilder'
import { CompanyController } from '#adapter/controllers/companyController'

export const handler: Handler = async (_event: APIGatewayEvent) => {
  const companyController = Container.get(CompanyController)
  return responseBuilder.build(await companyController.getAll())
}
