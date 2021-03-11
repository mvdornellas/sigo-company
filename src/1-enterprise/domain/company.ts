import { Standard } from '#enterprise/domain/standard'
import { Entity } from '#enterprise/domain/entity'
import { v4 as uuid } from 'uuid'

export class Company extends Entity {
  name!: string
  cnpj!: number
  email!: string
  startHire!: string
  endHire!: string
  createdAt?: string
  updatedAt?: string
  standards?: Standard[]

  constructor (obj: Partial<Company>) {
    super()
    obj.id = uuid()
    Object.assign(this,obj)
  }
}
