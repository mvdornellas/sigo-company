export class StandardDto {
  id!: string
  name!: string
  rating?: number
  constructor (obj: Partial<StandardDto>) {
    Object.assign(this,obj)
  }
}
