import { StandardDto } from '#application/dto/standard'

export class AssessInput {
  companyId!: string
  standards!: StandardDto[]
  constructor (obj: Partial<AssessInput>) {
    Object.assign(this, obj)
  }
}
