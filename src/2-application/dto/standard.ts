export class StandardDto {
  id!: string
  name!: string
  rating?: number
  createdAt?: string
  constructor (obj: Partial<StandardDto>) {
    Object.assign(this,obj)
  }
}
