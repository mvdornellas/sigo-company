export class GetAllCompanyOutput {
  id!: string
  name!: string
  email!: string
  cnpj!: number
  startHire!: string
  endHire!: string
  createdAt!: string
  updatedAt?: string

  constructor (obj: Partial<GetAllCompanyOutput>) {
    Object.assign(this, obj)
  }
}
