import { ApplicationError, OutputBase } from '#adapter/outputBase'
import { ComplianceCompanyOutput } from '#adapter/serializers/compliance/complianceOutput'
import { SendEmailComplianceInput } from '#adapter/serializers/compliance/sendEmailInput'
import { GetCompanyUseCase } from '#application/useCases/company/getUseCase'
import { SendEmailComplianceUseCase } from '#application/useCases/compliance/sendEmailUseCase'
import { GetAllStandardUseCase } from '#application/useCases/standard/getAllUseCase'
import { Company } from '#enterprise/domain/company'
import { Inject, Service } from 'typedi'
import { UpdateStandardUseCase } from '#application/useCases/standard/updateUseCase'
import { UpdateComplianceAssessedUseCase } from '#application/useCases/company/complianceAssessed'
import { AssessInput } from '#adapter/serializers/compliance/assessInput'

@Service()
export class ComplianceController {
  @Inject() private readonly getAllStandardUseCase!: GetAllStandardUseCase
  @Inject() private readonly updateStandardUseCase!: UpdateStandardUseCase
  @Inject() private readonly sendEmailComplianceUseCase!: SendEmailComplianceUseCase
  @Inject() private readonly getCompanyUseCase!: GetCompanyUseCase
  @Inject() private readonly updateComplianceAssessedUseCase!: UpdateComplianceAssessedUseCase

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
      if (company.complianceAssessed) {
        return new OutputBase({
          success: false,
          errors: [{
            code: 'COMPLIANCE_ALREADY_ASSESSED',
            message: 'Compliance Already Assessed'
          }] as ApplicationError[]
        })
      }
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

  async assess ({ standards, companyId }: AssessInput): Promise<OutputBase<boolean>> {
    try {
      for (const standard of standards) {
        await this.updateStandardUseCase.run({ companyId, standard })
      }

      await this.updateComplianceAssessedUseCase.run(companyId)

      return new OutputBase<boolean>({
        data: true
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
