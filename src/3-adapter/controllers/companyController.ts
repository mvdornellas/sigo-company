import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { PrinterDisconnectInput as UserLoggedDisconnectInput } from '#adapter/serializers/printer/disconnectInput'
import { PrinterConnectInput as UserLoggedInput } from '#adapter/serializers/printer/connectInput'
import { CreateCompanyUseCase } from '#application/useCases/company/createUseCase'
import { GetAllCompanyUseCase } from '#application/useCases/company/getAllUseCase'

@Service()
export class CompanyController {
  @Inject()
  private readonly createCompanyUseCase!: CreateCompanyUseCase

  @Inject()
  private readonly getAllCompanyUseCase!: GetAllCompanyUseCase

  async create (input: UserLoggedInput): Promise<boolean> {
    try {
      this.createCompanyUseCase.run()
    } catch (error) {
      console.error(`[!] ERROR CREATE COMPANY`, input)
      return false
    }
  }

  async getAll (input: UserLoggedDisconnectInput): Promise<boolean> {
    return this.userLoggedUseCase.disconnect(input.connectionId)
  }

}
