export interface UseCaseBase<T> {
  run (input: any): Promise<T>
}
