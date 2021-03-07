export class SendCompanyEmailInput {
  id!: string
  name!: string
  cnpj!: number
  email!: string
  startHire!: string
  endHire!: string
  createdAt?: string
  updatedAt?: string

  constructor (obj: Partial<SendCompanyEmailInput>) {
    Object.assign(this, obj)
  }
}
