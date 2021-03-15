import { CompanyDto } from '#application/dto/company'

export class CreateCompanyOutput {
  company!: CompanyDto
  constructor (obj: Partial<CreateCompanyOutput>) {
    Object.assign(this, obj)
  }
}
