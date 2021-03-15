export class SendEmailComplianceInput {
  id!: string
  name!: string
  cnpj!: number
  email!: string
  startHire!: string
  endHire!: string
  createdAt?: string
  updatedAt?: string

  constructor (obj: Partial<SendEmailComplianceInput>) {
    Object.assign(this, obj)
  }
}
