import { StandardDto } from '#application/dto/standard'
export class CompanyDto {
  id!: string
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  complianceAssessed!: boolean
  standards?: StandardDto[]
  createdAt?: string
  updatedAt?: string

  constructor (obj: Partial<CompanyDto>) {
    Object.assign(this,obj)
  }
}
