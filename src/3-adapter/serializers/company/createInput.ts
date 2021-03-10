export class CreateCompanyInput {
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  standards!: StandardInput[]
  constructor (obj: Partial<CreateCompanyInput>) {
    Object.assign(this,obj)
  }
}

export class StandardInput {
  id!: string
  name!: string
  constructor (obj: Partial<StandardInput>) {
    Object.assign(this,obj)
  }
}
