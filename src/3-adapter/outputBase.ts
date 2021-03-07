export class OutputBase<T> {
  success?: true | false = true
  data!: T | any
  errors?: any
}
