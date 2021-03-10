export class CompanyDto {
  id?: string
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  createdAt!: string
  updatedAt!: string
  standards!: StandardDto[]

  constructor (obj: Partial<CompanyDto>) {
    Object.assign(this,obj)
  }
}

export class StandardDto {
  id!: string
  name!: string
  constructor (obj: Partial<StandardDto>) {
    Object.assign(this,obj)
  }
}
