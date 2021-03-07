import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import responseBuilder from '#framework/common/responseBuilder'
import { CompanyController } from '#adapter/controllers/companyController'
import { CreateCompanyInput } from '#adapter/serializers/company/createInput'

export const handler: Handler = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body || '{}')
  console.log(`[I] BODY REQUEST`, body)
  const { name, email, cnpj, startHire, endHire } = body
  const companyController = Container.get(CompanyController)
  return responseBuilder.build(await companyController.create({
    name, email, cnpj, startHire, endHire
  } as CreateCompanyInput))
}
