export class OutputBase<T> {
  success?: true | false = true
  data!: T
  errors?: any

  constructor (output?: Partial<OutputBase<T>>) {
    Object.assign(this, output)
  }
}
