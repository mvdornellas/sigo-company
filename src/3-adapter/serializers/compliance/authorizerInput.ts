export class AuthorizerComplianceInput {
  token!: string
  methodArn!: string
  type!: string

  constructor (obj: Partial<AuthorizerComplianceInput>) {
    Object.assign(this, obj)
  }

}
