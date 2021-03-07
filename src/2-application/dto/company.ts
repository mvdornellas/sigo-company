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

export type StandardDto = {
  id: string,
  name: string,
  rating?: number
}
