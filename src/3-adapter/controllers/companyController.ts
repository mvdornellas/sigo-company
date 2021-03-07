import { CompanyDto } from '#application/dto/company'
import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { CreateCompanyUseCase } from '#application/useCases/company/createUseCase'
import { GetAllCompanyUseCase } from '#application/useCases/company/getAllUseCase'
import { CreateCompanyInput } from '#adapter/serializers/company/createInput'
import { GetAllCompanyOutput } from '#adapter/serializers/company/getAllOutput'
import { OutputBase } from '#adapter/outputBase'

@Service()
export class CompanyController {
  @Inject()
  private readonly createCompanyUseCase!: CreateCompanyUseCase

  @Inject()
  private readonly getAllCompanyUseCase!: GetAllCompanyUseCase

  async create (input: CreateCompanyInput): Promise<OutputBase<boolean>> {
    try {
      const { name, cnpj, email, startHire, endHire } = input
      console.info(`[I] COMPANY CREATE INPUT`, input)
      await this.createCompanyUseCase.run({
        name,
        cnpj,
        email,
        startHire,
        endHire
      } as CompanyDto)
      return { data: true }
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
      return {
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
      }

    } catch (error) {
      console.error(`[E] GET ALL COMPANY`, error)
      return {
        success: false,
        data: {},
        errors: error
      }
    }

  }

}
