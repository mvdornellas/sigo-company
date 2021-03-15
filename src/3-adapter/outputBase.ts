export type ApplicationError = {
  code: string,
  message: string
}

export class OutputBase<T> {
  success?: true | false = true
  data!: T
  errors?: any | ApplicationError[]

  constructor (output?: Partial<OutputBase<T>>) {
    Object.assign(this, output)
  }
}
