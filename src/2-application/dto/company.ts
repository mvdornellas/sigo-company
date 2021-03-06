import uuid from 'uuid'

export class CompanyDto {
  id: string = uuid.v4()
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  standards!: StandardDto[]
}

export type StandardDto = {
  id: string,
  name: string,
  rating?: number
}
