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

@Service()
export class CompanyController {
  @Inject() private readonly createCompanyUseCase!: CreateCompanyUseCase

  @Inject() private readonly getAllCompanyUseCase!: GetAllCompanyUseCase

  @Inject() private readonly sendCompanyEmailUseCase!: SendCompanyEmailUseCase

  async create (input: CreateCompanyInput): Promise<OutputBase<CreateCompanyOutput>> {
    try {
      console.info(`[I] COMPANY CREATE INPUT`, input)
      const companyCreated = await this.createCompanyUseCase.run(new CompanyDto(input))
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
        data: companies.map(({ id, name, email, cnpj, startHire, endHire, createdAt, updatedAt }: CompanyDto) => {
          return {
            id,
            name,
            email,
            cnpj,
            startHire: startHire,
            endHire: endHire,
            createdAt: createdAt,
            updatedAt: updatedAt
          } as GetAllCompanyOutput
        })
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
