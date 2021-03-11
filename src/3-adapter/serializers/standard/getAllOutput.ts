export class GetAllStandardOutput {
  id!: string
  name!: string
  rating!: number
  createdAt!: string
  updatedAt?: string

  constructor (obj: Partial<GetAllStandardOutput>) {
    Object.assign(this, obj)
  }
}
