export class CompanyDto {
  id!: string
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  createdAt?: string
  updatedAt?: string

  constructor (obj: Partial<CompanyDto>) {
    Object.assign(this,obj)
  }
}
