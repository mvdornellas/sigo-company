import { StandardDto } from '#application/dto/standard'
import { AssessInput } from './../serializers/compliance/assessInput'
import { OutputBase } from '#adapter/outputBase'
import { ComplianceCompanyOutput } from '#adapter/serializers/compliance/complianceOutput'
import { SendEmailComplianceInput } from '#adapter/serializers/compliance/sendEmailInput'
import { GetCompanyUseCase } from '#application/useCases/company/getUseCase'
import { SendEmailComplianceUseCase } from '#application/useCases/compliance/sendEmailUseCase'
import { GetAllStandardUseCase } from '#application/useCases/standard/getAllUseCase'
import { Company } from '#enterprise/domain/company'
import { Inject, Service } from 'typedi'
import { UpsertStandardUseCase } from '#application/useCases/standard/upsertUseCase'

@Service()
export class ComplianceController {
  @Inject() private readonly getAllStandardUseCase!: GetAllStandardUseCase
  @Inject() private readonly upsertStandardUseCase!: UpsertStandardUseCase
  @Inject() private readonly sendEmailComplianceUseCase!: SendEmailComplianceUseCase
  @Inject() private readonly getCompanyUseCase!: GetCompanyUseCase

  async sendEmail (input: SendEmailComplianceInput): Promise<boolean> {
    const { email } = input
    try {
      console.info('[I] SEND EMAIL DATA', input)
      return this.sendEmailComplianceUseCase.run(new Company(input))
    } catch (error) {
      console.error(`[E] SEND EMAIL TO COMPANY`, error)
      throw new Error(`ERROR SEND EMAIL TO COMPANY ${email}`)
    }
  }

  async get (id: string): Promise<OutputBase<ComplianceCompanyOutput>> {
    try {
      const company = await this.getCompanyUseCase.run(id)
      const standards = await this.getAllStandardUseCase.run(id)
      console.info('[I] GET ALL STANDARDS FROM COMPLIANCE DATA', standards)
      return new OutputBase<ComplianceCompanyOutput>({
        data: {
          company,
          standards: standards
        }
      })
    } catch (error) {
      console.error(`[E] GET ALL STANDARDS FROM COMPLIANCE`, error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }
  }

  async assess ({ standards, companyId }: AssessInput) {
    try {
      console.log(companyId)

      console.log(standards)
      const standardsUpserted = await this.upsertStandardUseCase.run({ companyId, standards })
      return new OutputBase<StandardDto[]>({
        data: standardsUpserted
      })
    } catch (error) {
      console.error('[E] ASSESS COMPLIANCE', error)
      return new OutputBase({
        success: false,
        errors: error
      })
    }
  }
}
