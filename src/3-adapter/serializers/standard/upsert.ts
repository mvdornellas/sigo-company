export class UpsertStandard {
  id!: string
  name!: string
  rating?: number
  createdAt?: string
  updatedAt?: string

  constructor (obj: Partial<UpsertStandard>) {
    Object.assign(this, obj)
  }
}
