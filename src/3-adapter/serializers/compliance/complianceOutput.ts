import { CompanyDto } from '#application/dto/company'
import { StandardDto } from '#application/dto/standard'

export class ComplianceCompanyOutput {
  company!: CompanyDto
  standards!: StandardDto[]

  constructor (obj: Partial<ComplianceCompanyOutput>) {
    Object.assign(this, obj)
  }
}
