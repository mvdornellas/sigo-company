import { CompanyDto } from '#application/dto/company'
import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { CreateCompanyUseCase } from '#application/useCases/company/createUseCase'
import { GetAllCompanyUseCase } from '#application/useCases/company/getAllUseCase'
import { CreateCompanyInput } from '#adapter/serializers/company/createInput'
import { GetAllCompanyOutput } from '#adapter/serializers/company/getAllOutput'
import { OutputBase } from '#adapter/outputBase'
import { CreateCompanyOutput } from '#adapter/serializers/company/createOutput'
import { SendCompanyEmailInput } from '#adapter/serializers/company/sendEmailInput'
import { SendCompanyEmailUseCase } from '#application/useCases/company/sendEmailUseCase'
import _ from 'lodash'
import { UpsertStandardUseCase } from '#application/useCases/standard/upsertUseCase'
import { StandardDto } from '#application/dto/standard'
import { DeleteCompanyUseCase } from '#application/useCases/company/deleteUseCase'

@Service()
export class CompanyController {
  @Inject() private readonly createCompanyUseCase!: CreateCompanyUseCase

  @Inject() private readonly getAllCompanyUseCase!: GetAllCompanyUseCase

  @Inject() private readonly sendCompanyEmailUseCase!: SendCompanyEmailUseCase

  @Inject() private readonly upsertStandardUseCase!: UpsertStandardUseCase

  @Inject() private readonly deleteCompanyUseCase!: DeleteCompanyUseCase

  async create (input: CreateCompanyInput): Promise<OutputBase<CreateCompanyOutput>> {
    try {
      console.info(`[I] COMPANY CREATE INPUT`, input)
      const companyCreated = await this.createCompanyUseCase.run(new CompanyDto(input))

      companyCreated.standards = await this.upsertStandardUseCase.run({
          companyId: companyCreated.id,
          standards: input.standards!.map(standard => new StandardDto(standard))
        }).catch(async rollback => {
          console.info(`[E] ROLLBACK CREATE COMPANY`, rollback)
          await this.deleteCompanyUseCase.run(companyCreated.id)
          throw new Error(JSON.stringify(rollback))
        })

      return new OutputBase<CreateCompanyOutput>({
        data: companyCreated
      })
    } catch (error) {
      console.error(`[E] CREATE COMPANY`, error)
      return {
        success: false,
        data: false,
        errors: error
      }
    }
  }

  async getAll (): Promise<OutputBase<GetAllCompanyOutput[]>> {
    try {
      const companies = await this.getAllCompanyUseCase.run()
      console.info('[I] COMPANIES DATA', companies)
      return new OutputBase({
        data: _.sortBy(companies,['name'],['asc']).map(company => new GetAllCompanyOutput(company))
      })
    } catch (error) {
      console.error(`[E] GET ALL COMPANY`, error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }

  }

  async sendEmail (input: SendCompanyEmailInput): Promise<any> {
    try {
      console.info('[I] SEND EMAIL DATA', input)
      return this.sendCompanyEmailUseCase.run(input)
    } catch (error) {
      console.error(`[E] SEND EMAIL TO COMPANY`, error)
    }
  }

}
