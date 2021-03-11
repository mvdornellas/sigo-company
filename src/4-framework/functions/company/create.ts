import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import builder from '#framework/common/builder'
import { CompanyController } from '#adapter/controllers/companyController'
import { CreateCompanyInput } from '#adapter/serializers/company/createInput'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body || '{}')
  console.log(`[I] BODY REQUEST`, body)
  const companyController = Container.get(CompanyController)
  body.cnpj = parseInt(body.cnpj, 10)
  return builder.response(await companyController.create(new CreateCompanyInput(body)))
}
