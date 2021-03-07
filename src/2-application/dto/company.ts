import uuid from 'uuid'

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
}

export type StandardDto = {
  id: string,
  name: string,
  rating?: number
}
