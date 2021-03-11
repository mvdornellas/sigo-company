import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'
import { CompanyController } from '#adapter/controllers/companyController'

export const handler: Handler = async (_event: APIGatewayEvent) => {
  const companyController = Container.get(CompanyController)
  return builder.response(await companyController.getAll())
}
