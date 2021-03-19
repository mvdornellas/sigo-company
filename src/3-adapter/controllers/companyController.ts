import { CompanyDto } from '#application/dto/company'
import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { CreateCompanyUseCase } from '#application/useCases/company/createUseCase'
import { GetAllCompanyDetailsUseCase } from '#application/useCases/company/getAllDetailsUseCase'
import { CreateCompanyInput } from '#adapter/serializers/company/createInput'
import { GetAllCompanyOutput } from '#adapter/serializers/company/getAllOutput'
import { OutputBase } from '#adapter/outputBase'
import { CreateCompanyOutput } from '#adapter/serializers/company/createOutput'
import _ from 'lodash'
import { CreateStandardUseCase } from '#application/useCases/standard/createUseCase'
@Service()
export class CompanyController {
  @Inject() private readonly createCompanyUseCase!: CreateCompanyUseCase

  @Inject() private readonly getAllCompanyDetailsUseCase!: GetAllCompanyDetailsUseCase

  @Inject() private readonly createStandardUseCase!: CreateStandardUseCase

  async create (input: CreateCompanyInput): Promise<OutputBase<CreateCompanyOutput>> {
    try {
      console.info(`[I] COMPANY CREATE INPUT`, input)
      const { company, standards } = input
      await this.createStandardUseCase.run({
        companyId: company.id,
        standards
      })
      const companyCreated = await this.createCompanyUseCase.run(new CompanyDto(company))
      return new OutputBase<CreateCompanyOutput>({
        data: new CreateCompanyOutput({ company: companyCreated })
      })
    } catch (error) {
      console.error(`[E] CREATE COMPANY`, error)
      return {
        success: false,
        data: new CreateCompanyOutput({}),
        errors: error
      }
    }
  }

  async getAll (): Promise<OutputBase<GetAllCompanyOutput[]>> {
    try {
      const companies = await this.getAllCompanyDetailsUseCase.run()
      console.info('[I] COMPANIES DATA', companies)
      return new OutputBase({
        data: companies.map(company => new GetAllCompanyOutput(company))
      })
    } catch (error) {
      console.error(`[E] GET ALL COMPANY`, error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }

  }

}
