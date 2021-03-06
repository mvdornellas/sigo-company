import { Entity } from '#enterprise/domain/entity'

export interface UseCaseBase {
  run (input: {}): Promise<Entity | Array<Entity> | void | {}>
}
